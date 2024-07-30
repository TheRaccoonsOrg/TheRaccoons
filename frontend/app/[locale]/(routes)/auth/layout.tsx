import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
