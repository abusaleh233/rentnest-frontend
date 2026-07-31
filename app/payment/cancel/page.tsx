'use client';

import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg dark:border-gray-800 dark:bg-gray-800">
        {/* Cancel Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl text-red-600 dark:bg-red-900/40 dark:text-red-400">
          ❌
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-gray-900 dark:text-white">
          পেমেন্ট বাতিল করা হয়েছে
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          আপনার ট্রানজেকশনটি সম্পূর্ণ হয়নি। আপনি চাইলে আবার চেষ্টা করতে পারেন অথবা আপনার ড্যাশবোর্ডে ফিরে যেতে পারেন।
        </p>

        <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            স্ট্যাটাস: <span className="font-semibold text-red-600 dark:text-red-400">CANCELLED / FAILED</span>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard/user"
            className="block w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
          >
            আবার চেষ্টা করুন (Dashboard) 🔄
          </Link>

          <Link
            href="/"
            className="block w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}