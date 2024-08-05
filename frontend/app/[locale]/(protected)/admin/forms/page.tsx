'use client';

import { getAllForms } from '@/actions/admin/management/forms';
import CreateTypeformDialog from '@/components/dialogs/CreateTypeformDialog';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

import { BarLoader } from 'react-spinners';
const FormsPage = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchForms = useCallback(async () => {
    setLoading(true);
    const data = await getAllForms();
    setForms(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  return (
    <div>
      <CreateTypeformDialog onFormCreated={fetchForms} />
      {loading ? (
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
          <BarLoader color="#36f8a7" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
          {forms.map((form, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{form.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500">Form ID: {form.typeformId}</p>
                  </div>
                  <Button variant="outline" className="text-sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;
