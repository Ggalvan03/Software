"use client";

import { useAuth } from '@/app/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Update the auth state in context
    router.push('./'); // Redirect to the login page (or another page)
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-6 text-white bg-red-500 hover:bg-red-600 rounded"
    >
      Logout
    </button>
  );
}