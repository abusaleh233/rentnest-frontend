'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function UserProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token = Cookies.get('token');

      const res = await fetch(
        'https://rentnest-backend-sage.vercel.app/api/users/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      setUser(result.data || result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        User not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">

      <div className="rounded-2xl border bg-white p-8 shadow">

        <div className="flex flex-col items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-5xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {user.name}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>

          <span className="mt-3 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            {user.role}
          </span>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {user.name}
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <h3 className="mt-2 text-lg font-bold break-all">
              {user.email}
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Role
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {user.role}
            </h3>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Joined
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : 'N/A'}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}