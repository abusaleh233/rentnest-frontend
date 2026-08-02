'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  totalPrice: number;
  startDate: string;
  endDate: string;
  property: {
    title: string;
    location: string;
    price: number;
  };
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Requests...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          📩 My Rental Requests
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage all your rental requests.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow">

          <div className="text-6xl">📭</div>

          <h2 className="mt-5 text-2xl font-bold">
            No Requests Found
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't submitted any rental request yet.
          </p>

          <Link
            href="/properties"
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
          >
            Browse Properties
          </Link>

        </div>
      ) : (

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="px-6 py-4 text-left">Property</th>
                <th className="px-6 py-4">Rent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Start</th>
                <th className="px-6 py-4">End</th>
                <th className="px-6 py-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {requests.map((item) => (

                <tr key={item.id} className="border-t">

                  <td className="px-6 py-4">

                    <h3 className="font-bold">
                      {item.property.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.property.location}
                    </p>

                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ৳ {item.property.price}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        item.status === 'APPROVED'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : item.status === 'CANCELLED'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {new Date(item.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(item.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <Link
                        href={`/dashboard/user/requests/${item.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        View
                      </Link>

                      {item.status === 'APPROVED' ? (
                        <Link
                          href={`/dashboard/user/requests/${item.id}/pay`}
                          className="rounded bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                        >
                          Pay 💳
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="cursor-not-allowed rounded bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-600"
                        >
                          Waiting
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}