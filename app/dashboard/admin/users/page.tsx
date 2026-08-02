'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const token = Cookies.get('token');
    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.data || [];
      setUsers(list);
    } catch (err: any) {
      setError(err.message || 'Failed to load user list.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete/ban this user?')) return;

    setActionLoadingId(id);
    const token = Cookies.get('token');

    try {
      const res = await fetch(`https://rentnest-backend-sage.vercel.app/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to delete user.');
      }

      // UI থেকে ইউজার রিমুভ করা
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      alert(err.message || 'Something went wrong.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const getRoleBadge = (role: User['role']) => {
    const styles = {
      ADMIN: 'bg-purple-100 text-purple-800 border-purple-300',
      OWNER: 'bg-blue-100 text-blue-800 border-blue-300',
      USER: 'bg-green-100 text-green-800 border-green-300',
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[role] || 'bg-gray-100'}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">User Management 👥</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and moderate all users on the platform.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-16 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
          No users found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role </th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={actionLoadingId === user.id}
                        className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 shadow-sm"
                      >
                        {actionLoadingId === user.id ? 'Processing..' : 'Ban / Delete 🚫'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}