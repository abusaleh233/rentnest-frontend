'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface RequestItem {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  user?: { name: string; email: string };
  property?: { title: string; price: number };
}

export default function OwnerRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const token = Cookies.get('token');
    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/landlord/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.data || [];
      setRequests(list);
    } catch (err) {
      console.error('Request fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setUpdatingId(id);
    const token = Cookies.get('token');

    try {
      const res = await fetch(`https://rentnest-backend-sage.vercel.app/api/landlord/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Optimistic State Update
        setRequests((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">ভাড়ার রিকোয়েস্টসমূহ 📩</h1>
      <p className="mt-1 text-sm text-gray-500">আবেদনকারীদের রিকোয়েস্ট একসেপ্ট বা রিজেক্ট করুন</p>

      {isLoading ? (
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          কোনো রিকোয়েস্ট পাওয়া যায়নি।
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4">আবেদনকারীর নাম</th>
                  <th className="px-6 py-4">প্রপার্টি</th>
                  <th className="px-6 py-4">স্ট্যাটাস</th>
                  <th className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.user?.name || 'N/A'} <br />
                      <span className="text-xs font-normal text-gray-400">{item.user?.email}</span>
                    </td>
                    <td className="px-6 py-4">{item.property?.title || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                          item.status === 'APPROVED'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : item.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.status === 'PENDING' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                            disabled={updatingId === item.id}
                            className="rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                            disabled={updatingId === item.id}
                            className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">নির্ধারিত</span>
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