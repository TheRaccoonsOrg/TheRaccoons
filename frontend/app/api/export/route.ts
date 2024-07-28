import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createObjectCsvStringifier } from 'csv-writer';
import ExcelJS from 'exceljs';

async function fetchFormAnswers(typeformId: string) {
  // Fetch form fields (questions) by typeformId
  const form = await db.form.findUnique({
    where: { typeformId },
    include: { fields: true },
  });

  if (!form) {
    throw new Error('Form not found');
  }

  // Fetch form responses
  const responses = await db.eventParticipant.findMany({
    where: { formId: form.id },
    include: { participant: true },
  });

  return { form, responses };
}

function formatDataForExport(form: any, responses: any[]) {
  const headers = form.fields.map((field: any) => field.fieldLabel);
  const data = responses.map((response: any) => {
    const answers = response.responses;
    return form.fields.map((field: any) => answers[field.fieldRef] || '');
  });

  return { headers, data };
}

async function exportToCsv(headers: string[], data: any[]) {
  const csvStringifier = createObjectCsvStringifier({
    header: headers.map((header) => ({ id: header, title: header })),
  });

  const records = data.map((row) => {
    const record: any = {};
    headers.forEach((header, index) => {
      record[header] = row[index];
    });
    return record;
  });

  // Add headers as the first row
  const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  return csvData;
}

async function exportToExcel(headers: string[], data: any[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Form Responses');

  worksheet.addRow(headers);
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const typeformId = searchParams.get('typeformId');
  const format = searchParams.get('format');

  if (!typeformId || (format !== 'csv' && format !== 'excel')) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const { form, responses } = await fetchFormAnswers(typeformId);
    const { headers, data } = formatDataForExport(form, responses);

    if (format === 'csv') {
      const csvData = await exportToCsv(headers, data);
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${form.name}.csv"`,
        },
      });
    } else if (format === 'excel') {
      const excelData = await exportToExcel(headers, data);
      return new Response(excelData, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${form.name}.xlsx"`,
        },
      });
    } else {
      return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error exporting form responses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
