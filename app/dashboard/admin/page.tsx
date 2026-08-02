'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalRentals: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({ totalUsers: 0, totalProperties: 0, totalRentals: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdminStats() {
      const token = Cookies.get('token');
      try {
        const [usersRes, propsRes, rentalsRes] = await Promise.all([
          fetch('https://rentnest-backend-sage.vercel.app/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://rentnest-backend-sage.vercel.app/api/admin/properties', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://rentnest-backend-sage.vercel.app/api/admin/rentals', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersRes.json();
        const propsData = await propsRes.json();
        const rentalsData = await rentalsRes.json();

        const users = Array.isArray(usersData) ? usersData : usersData?.data || [];
        const properties = Array.isArray(propsData) ? propsData : propsData?.data || [];
        const rentals = Array.isArray(rentalsData) ? rentalsData : rentalsData?.data || [];

        setStats({
          totalUsers: users.length,
          totalProperties: properties.length,
          totalRentals: rentals.length,
        });
      } catch (err: any) {
        setError(err.message || 'অ্যাডমিন ডাটা লোড করতে সমস্যা হয়েছে');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminStats();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard 🛡️</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of the platform status and user management.
          </p>
        </div>
        <Link
          href="/dashboard/admin/users"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow"
        >
          User Management Table 👥
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">মোট নিবন্ধিত ইউজার</p>
            <p className="mt-2 text-4xl font-extrabold text-indigo-600">{stats.totalUsers}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">মোট প্রপার্টি লিস্ট</p>
            <p className="mt-2 text-4xl font-extrabold text-blue-600">{stats.totalProperties}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">মোট রেন্টাল রিকোয়েস্ট</p>
            <p className="mt-2 text-4xl font-extrabold text-green-600">{stats.totalRentals}</p>
          </div>
        </div>
      )}
    </div>
  );
}