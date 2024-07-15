'use client';
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/data/user';
import { User } from '@prisma/client';

const PublicProfilePage = ({ params }: { params: { slug: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserByUsername(params.slug);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  return (
    <div>
      <p>{user.name} </p>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </div>
  );
};

export default PublicProfilePage;
