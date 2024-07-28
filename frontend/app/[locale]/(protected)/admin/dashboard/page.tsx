'use client';

import ExportButton from '@/components/ExportButton';

const DashboardPage = () => {
  const formId = 'wtzlqAe9';
  return (
    <div className="flex flex-row  h-full">
      <h1>Dashboard</h1>
      <ExportButton typeformId={formId} />
    </div>
  );
};

export default DashboardPage;
