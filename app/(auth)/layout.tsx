import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-indigo-50 via-white to-gray-100 py-12 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
          RentNest 🏠
        </Link>
        
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-md px-6 py-8 shadow-xl border border-gray-100 rounded-2xl dark:bg-gray-800/80 dark:border-gray-700 sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}