import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createObjectCsvStringifier } from 'csv-writer';
import ExcelJS from 'exceljs';
import { Prisma } from '@prisma/client';

// Define types for form and responses
type FormWithFields = Prisma.FormGetPayload<{
  include: { fields: true };
}>;

type EventParticipantWithParticipant = Prisma.EventParticipantGetPayload<{
  include: { participant: true };
}>;

type JsonObject = { [key: string]: string | number | boolean | JsonObject | JsonArray };
type JsonArray = (string | number | boolean | JsonObject | JsonArray)[];

async function fetchFormAnswers(
  typeformId: string,
): Promise<{ form: FormWithFields; responses: EventParticipantWithParticipant[] }> {
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

function formatDataForExport(form: FormWithFields, responses: EventParticipantWithParticipant[]) {
  const headers = form.fields.map((field) => field.fieldLabel);
  const data = responses.map((response) => {
    const answers = response.responses as JsonObject;
    return form.fields.map((field) => String(answers[field.fieldRef] ?? ''));
  });

  return { headers, data };
}

async function exportToCsv(headers: string[], data: string[][]) {
  const csvStringifier = createObjectCsvStringifier({
    header: headers.map((header) => ({ id: header, title: header })),
  });

  const records = data.map((row) => {
    const record: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      record[header] = row[index];
    });
    return record;
  });

  // Add headers as the first row
  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
}

async function exportToExcel(headers: string[], data: string[][]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Form Responses');

  worksheet.addRow(headers);
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  return await workbook.xlsx.writeBuffer();
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
