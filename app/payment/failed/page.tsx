'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-5">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed
        </h1>

        <p className="mt-4 text-gray-600">
          Sorry! Your payment could not be completed.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          This may happen because of:
        </p>

        <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
          <li>• Insufficient balance</li>
          <li>• Incorrect card information</li>
          <li>• Payment was declined by your bank</li>
          <li>• Temporary network issue</li>
        </ul>

        <div className="mt-8 flex flex-col gap-3">

          <Link
            href="/dashboard/user"
            className="rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/properties"
            className="rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Browse Properties
          </Link>

        </div>

      </div>
    </div>
  );
}