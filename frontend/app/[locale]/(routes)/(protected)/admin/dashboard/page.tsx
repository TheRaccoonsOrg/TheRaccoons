'use client';
import { UserInfo } from '@/components/UserInfo';
import React, { useEffect, useState } from 'react';
import { useRouter } from '@/i18n';
import { getSession } from 'next-auth/react';
import { ExtendedUser } from '@/next-auth';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) return;
      setUser(session?.user);
    };
    fetchSession();
  }, []);

  if (!user) return <div>Loading...</div>;
  if (user.role !== 'ADMIN') return router.push('/404');

  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo label="Info about current user" user={user} />
    </div>
  );
};

export default DashboardPage;
