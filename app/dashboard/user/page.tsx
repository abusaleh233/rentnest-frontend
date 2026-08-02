'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  property: {
    title: string;
    location: string;
    price: number;
  };
}

export default function UserDashboardPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const token = Cookies.get('token');

      const res = await fetch(
        'https://rentnest-backend-sage.vercel.app/api/rentals',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      setRequests(result.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const total = requests.length;
  const pending = requests.filter(r => r.status === 'PENDING').length;
  const approved = requests.filter(r => r.status === 'APPROVED').length;
  const rejected = requests.filter(r => r.status === 'REJECTED').length;

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          🏠 User Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Manage your rental requests and payments.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Requests</p>
          <h2 className="mt-2 text-4xl font-bold text-indigo-600">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Pending</p>
          <h2 className="mt-2 text-4xl font-bold text-yellow-500">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Approved</p>
          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {approved}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Rejected</p>
          <h2 className="mt-2 text-4xl font-bold text-red-600">
            {rejected}
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="mb-5 text-2xl font-bold">
          ⚡ Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <Link
            href="/properties"
            className="rounded-xl bg-indigo-600 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">🏠</div>

            <h3 className="mt-4 text-xl font-bold">
              Browse Properties
            </h3>

            <p className="mt-2 text-sm opacity-90">
              Find your next rental home.
            </p>
          </Link>

          <Link
            href="/dashboard/user/payment-history"
            className="rounded-xl bg-green-600 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">💳</div>

            <h3 className="mt-4 text-xl font-bold">
              Payment History
            </h3>

            <p className="mt-2 text-sm opacity-90">
              View all your completed payments.
            </p>
          </Link>



          <Link
            href="/dashboard/user/requests"
            className="rounded-xl bg-orange-500 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">📩</div>

            <h3 className="mt-4 text-xl font-bold">
              My Requests
            </h3>

            <p className="mt-2 text-sm opacity-90">
              Track your rental requests.
            </p>
          </Link>

        </div>
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Recent Requests
            </h2>
          </div>

          <div className="space-y-4">
            {requests.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border p-5"
              >
                <div>
                  <h3 className="font-bold">
                    {item.property.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.property.location}
                  </p>
                </div>

                <div className="flex gap-2">

                  <Link
                    href={`/dashboard/user/requests/${item.id}`}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    View
                  </Link>

                  {item.status === "APPROVED" && (
                    <Link
                      href={`/dashboard/user/requests/${item.id}/pay`}
                      className="rounded bg-green-600 px-4 py-2 text-white"
                    >
                      Pay
                    </Link>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}