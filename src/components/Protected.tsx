import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import api from '@/api';
import { useAuth, User } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

import Header from './Header';
import Sidebar from './Sidebar';

function Protected() {
  const { isAuthenticated, user, logout, setUser } = useAuth();

  const {
    data: authuser,
    isLoading,
    isSuccess,
  } = useQuery<{
    code: number;
    message: string;
    data: User;
  }>({
    queryKey: ["user"],
    queryFn: async () => await api.get({ entity: "auth/profile" }),
    enabled: isAuthenticated,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(authuser?.data);
    }
  }, [authuser?.data, isSuccess, setUser]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-4">
        <img
          className="w-[200px] h-[60px] mr-2 rounded-xl border border-gray-100 mb-4 py-1 bg-white px-2"
          src="https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg"
          alt="logo"
        />
        <svg
          className="w-10 h-10 mr-3 -ml-1 text-blue-400 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!authuser) {
    logout();
    return <Navigate to="/" />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex flex-row flex-1">
          <Sidebar />
          <main className="flex-1 px-20 py-12 pb-0">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
}

export default Protected;
