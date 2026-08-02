'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface Payment {
  id: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  rentalRequest: {
    id: string;
    property: {
      title: string;
      location: string;
    };
  };
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      const token = Cookies.get('token');

      const res = await fetch(
        'https://rentnest-backend-sage.vercel.app/api/payments/history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      setPayments(result.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Payment History...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          💳 Payment History
        </h1>

        <p className="mt-2 text-gray-500">
          View all your completed rental payments.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow">

          <div className="text-6xl">
            💳
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            No Payments Found
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't completed any payments yet.
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

                <th className="px-6 py-4 text-left">
                  Property
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Transaction
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <h3 className="font-semibold">
                      {payment.rentalRequest.property.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {payment.rentalRequest.property.location}
                    </p>

                  </td>

                  <td className="px-6 py-4 font-bold text-green-600">
                    ৳ {payment.amount}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {payment.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="font-mono text-xs">
                      {payment.transactionId}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {new Date(payment.createdAt).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-4">

                    <Link
                      href={`/dashboard/user/requests/${payment.rentalRequest.id}`}
                      className="rounded bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      View Rental
                    </Link>

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