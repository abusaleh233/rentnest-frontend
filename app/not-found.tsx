import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-indigo-600 dark:text-indigo-500">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 max-w-lg text-base leading-7 text-gray-500 dark:text-gray-400">
        The page you're looking for might have been removed, renamed, or is
        temporarily unavailable. Please check the URL or return to the homepage.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
        >
          🏠 Back to Home
        </Link>

        <Link
          href="/properties"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          🔍 Browse Properties
        </Link>
      </div>
    </div>
  );
}