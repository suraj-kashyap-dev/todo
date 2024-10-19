import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isAuthenticated = false; // Replace with your auth logic

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && ['/login', '/register'].includes(pathname)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <Outlet />
      </div>
    </div>
  );
};
