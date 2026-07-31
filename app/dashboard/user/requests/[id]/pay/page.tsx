'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceedPayment = async () => {
    setIsLoading(true);
    setError(null);

    const token = Cookies.get('token');

    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rentalId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা সম্ভব হয়নি');
      }

      // যদি ব্যাকএন্ড সরাসরি Stripe Checkout URL বা Session Redirection দেয়
      if (data.url || data.data?.url) {
        window.location.href = data.url || data.data?.url;
      } else {
        // ডেমো/কনফার্মেশন টেস্টের জন্য
        router.push('/payment/success');
      }
    } catch (err: any) {
      setError(err.message || 'পেমেন্ট প্রসেসিংয়ে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl dark:bg-indigo-900/50">
            💳
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">ভাড়া পরিশোধ করুন</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            রিকোয়েস্ট ID: <span className="font-mono text-xs font-semibold">{id}</span>
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>পেমেন্ট টাইপ:</span>
            <span className="font-semibold text-gray-900 dark:text-white">Rental Booking Fee</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>গেটওয়ে:</span>
            <span className="font-semibold text-indigo-600">Stripe Secure Payment</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleProceedPayment}
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'পেমেন্ট পেজে রিডাইরেক্ট হচ্ছে...' : 'পেমেন্ট নিশ্চিত করুন 🚀'}
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
}