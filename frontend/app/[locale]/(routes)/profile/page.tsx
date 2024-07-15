'use client';

import { useCurrentSession } from '@/hooks/useCurrentSession';

const ProfilePage = () => {
  const user = useCurrentSession().user;

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <p>TEST</p>
    </div>
  );
};

export default ProfilePage;
