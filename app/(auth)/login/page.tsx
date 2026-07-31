'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { LoginInput, loginSchema } from '@/app/lib/zod-schemas';
import { jwtDecode } from "jwt-decode";


export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message || 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }

      // Cookies-এ টোকেন এবং রোল সেট করা (মিডলওয়্যারের জন্য)
      const token = result.data?.accessToken;

      if (token) {
        Cookies.set("token", token, { expires: 7 });

        const decoded = jwtDecode<{
          id: string;
          role: "ADMIN" | "OWNER" | "USER";
        }>(token);

        Cookies.set("role", decoded.role, { expires: 7 });

        if (decoded.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (decoded.role === "OWNER") {
          router.push("/dashboard/owner");
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (err: any) {
      setError(err.message || 'কোথাও কোনো ভুল হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            RentNest-এ লগইন করুন 🏠
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            আপনার অ্যাকাউন্ট নেভিগেট করতে বিস্তারিত দিন
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ইমেইল
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                পাসওয়ার্ড
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2.5 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'প্রসেসিং হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}