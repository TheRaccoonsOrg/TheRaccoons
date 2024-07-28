'use client';

import React, { useState } from 'react';

interface DownloadButtonProps {
  typeformId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ typeformId }) => {
  const [format, setFormat] = useState<'csv' | 'excel'>('csv');

  const handleDownload = async () => {
    const response = await fetch(`/api/export?typeformId=${typeformId}&format=${format}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${typeformId}.${format === 'csv' ? 'csv' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to download file');
    }
  };

  return (
    <div>
      <select value={format} onChange={(e) => setFormat(e.target.value as 'csv' | 'excel')}>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadButton;
