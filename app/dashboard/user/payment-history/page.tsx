'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: string;
  createdAt: string;
  rentalRequest: {
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
        <h1 className="text-3xl font-bold">
          💳 Payment History
        </h1>

        <p className="mt-2 text-gray-500">
          View all your completed payments.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">Property</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Transaction</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No Payment History Found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t"
                >
                  <td className="px-6 py-4 font-semibold">
                    {payment.rentalRequest.property.title}
                  </td>

                  <td className="px-6 py-4">
                    {payment.rentalRequest.property.location}
                  </td>

                  <td className="px-6 py-4 font-bold text-green-600">
                    ৳ {payment.amount}
                  </td>

                  <td className="px-6 py-4">
                    {payment.transactionId}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}