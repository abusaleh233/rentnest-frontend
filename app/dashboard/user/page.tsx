'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
  };
}

export default function TenantDashboard() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRentals() {
      const token = Cookies.get('token');
      try {
        const res = await fetch('https://rentnest-backend-sage.vercel.app/api/rentals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'ডেটা লোড করতে ব্যর্থ হয়েছে');

        const list = Array.isArray(data) ? data : data?.data || [];
        setRequests(list);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRentals();
  }, []);

  const getStatusBadge = (status: RentalRequest['status']) => {
    switch (status) {
      case 'APPROVED':
        return <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 border border-blue-300">APPROVED</span>;
      case 'PENDING':
        return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 border border-yellow-300">PENDING</span>;
      case 'REJECTED':
        return <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 border border-red-300">REJECTED</span>;
      case 'CANCELLED':
        return <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 border border-gray-300">CANCELLED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tenant Dashboard 🏠</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          আপনার সকল রেন্ট রিকোয়েস্ট এবং পেমেন্ট স্ট্যাটাস দেখুন
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-800">
          <p className="text-gray-500">আপনি এখনও কোনো রেন্ট রিকোয়েস্ট পাঠাবেননি।</p>
          <Link
            href="/properties"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            প্রপার্টি ব্রাউজ করুন
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">প্রপার্টির নাম</th>
                  <th scope="col" className="px-6 py-4">লোকেশন</th>
                  <th scope="col" className="px-6 py-4">ভাড়া (মাসিক)</th>
                  <th scope="col" className="px-6 py-4">স্ট্যাটাস</th>
                  <th scope="col" className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.property?.title || 'N/A'}
                    </td>
                    <td className="px-6 py-4">{item.property?.location || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-indigo-600">৳{item.property?.price}</td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-right">
                      {item.status === 'APPROVED' ? (
                        <Link
                          href={`/dashboard/user/requests/${item.id}/pay`}
                          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm"
                        >
                          Pay Now 💳
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">অপেক্ষা করুন</span>
                      )}
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