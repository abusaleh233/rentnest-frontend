import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-indigo-600 dark:text-indigo-500">404</h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
        >
          হোমপেজে ফিরে যান 🏠
        </Link>

        <Link
          href="/properties"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          প্রপার্টি খুঁজুন 🔍
        </Link>
      </div>
    </div>
  );
}