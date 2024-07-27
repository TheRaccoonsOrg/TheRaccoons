'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

const ProfilePage = () => {
  const user = useCurrentUser();

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <p>TEST</p>
    </div>
  );
};

export default ProfilePage;
