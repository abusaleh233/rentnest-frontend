'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface LandlordStats {
  totalProperties: number;
  pendingRequests: number;
}

export default function OwnerDashboardPage() {
  const [stats, setStats] = useState<LandlordStats>({ totalProperties: 0, pendingRequests: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOwnerDashboardData() {
      const token = Cookies.get('token');
      try {
        const [propsRes, reqsRes] = await Promise.all([
          fetch('https://rentnest-backend-sage.vercel.app/api/properties', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://rentnest-backend-sage.vercel.app/api/landlord/requests', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const propsData = await propsRes.json();
        const reqsData = await reqsRes.json();

        const propertyList = Array.isArray(propsData) ? propsData : propsData?.data || [];
        const requestList = Array.isArray(reqsData) ? reqsData : reqsData?.data || [];

        const pendingCount = requestList.filter((r: any) => r.status === 'PENDING').length;

        setStats({
          totalProperties: propertyList.length,
          pendingRequests: pendingCount,
        });
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadOwnerDashboardData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Landlord Dashboard 🏘️</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            আপনার প্রপার্টি ও ভাড়ার রিকোয়েস্ট ম্যানেজ করুন
          </p>
        </div>
        <Link
          href="/dashboard/owner/properties/new"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow"
        >
          + নতুন প্রপার্টি যোগ করুন
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">মোট প্রপার্টি</p>
            <p className="mt-2 text-4xl font-extrabold text-indigo-600">{stats.totalProperties}</p>
            <Link
              href="/properties"
              className="mt-4 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              সব প্রপার্টি দেখুন &rarr;
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">পেন্ডিং রিকুয়েস্ট</p>
            <p className="mt-2 text-4xl font-extrabold text-yellow-600">{stats.pendingRequests}</p>
            <Link
              href="/dashboard/owner/requests"
              className="mt-4 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              রিকোয়েস্ট ম্যানেজ করুন &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}