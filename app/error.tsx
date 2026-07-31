'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600 dark:bg-red-900/40 dark:text-red-400">
        ⚠️
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
        কিছু একটা সমস্যা হয়েছে!
      </h1>
      
      <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        অ্যাপ্লিকেশনে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা আমাদের সাপোর্টে যোগাযোগ করুন।
      </p>

      {error.digest && (
        <p className="mt-2 font-mono text-xs text-gray-400">
          Error Digest: {error.digest}
        </p>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
        >
          আবার চেষ্টা করুন 🔄
        </button>

        <a
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          হোমপেজে যান
        </a>
      </div>
    </div>
  );
}