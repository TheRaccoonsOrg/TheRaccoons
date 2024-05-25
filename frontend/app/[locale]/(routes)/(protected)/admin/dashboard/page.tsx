'use client';
import { UserInfo } from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react';

const DashboardPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo label="Info about current user" user={user} />
    </div>
  );
};

export default DashboardPage;
