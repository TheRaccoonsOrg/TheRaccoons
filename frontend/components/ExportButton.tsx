'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface DownloadButtonProps {
  typeformId: string;
}

const ExportButton: React.FC<DownloadButtonProps> = ({ typeformId }) => {
  const [loading, setLoading] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (triggerRef.current) {
      setMenuWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleDownload = async (format: 'csv' | 'excel') => {
    setLoading(format);
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
    setLoading(undefined);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" ref={triggerRef}>
          {loading ? 'Loading...' : 'Export data'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-full" style={{ width: menuWidth }}>
        <DropdownMenuItem onClick={() => handleDownload('csv')} disabled={loading === 'csv'}>
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload('excel')} disabled={loading === 'excel'}>
          Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
