'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from 'js-cookie';

const propertySchema = z.object({
  title: z.string().min(5, { message: 'টাইটেল অন্তত ৫ অক্ষরের হতে হবে' }),
  description: z.string().min(10, { message: 'বিবরণ অন্তত ১০ অক্ষরের হতে হবে' }),
  price: z.coerce.number().min(1000, { message: 'দাম সঠিক নয়' }),
  location: z.string().min(3, { message: 'লোকেশন লিখুন' }),
  imageUrl: z.string().url({ message: 'একটি সঠিক ইমেজের লিংক দিন' }),
});

// type PropertyFormData = z.infer<typeof propertySchema>;
type PropertyFormData = z.input<typeof propertySchema>;

export default function CreatePropertyPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    setError(null);

    const token = Cookies.get('token');

    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          images: [data.imageUrl],
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'প্রপার্টি ক্রিয়েট করা সম্ভব হয়নি');
      }

      router.push('/dashboard/owner');
    } catch (err: any) {
      setError(err.message || 'কোথাও কোনো ভুল হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">নতুন প্রপার্টি লিস্ট করুন 🏠</h1>
      <p className="mt-1 text-sm text-gray-500">আপনার প্রপার্টির তথ্য পূরণ করে প্রকাশ করুন</p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">প্রপার্টি টাইটেল</label>
          <input
            {...register('title')}
            type="text"
            placeholder="উদাহরণ: ২ বেডরুমের অ্যাপার্টমেন্ট"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">বিবরণ</label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="প্রপার্টির বিস্তারিত বিবরণ..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ভাড়া (মাসিক ৳)</label>
            <input
              {...register('price')}
              type="number"
              placeholder="15000"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
            />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">লোকেশন</label>
            <input
              {...register('location')}
              type="text"
              placeholder="মিরপুর ১০, ঢাকা"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
            />
            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ছবি URL</label>
          <input
            {...register('imageUrl')}
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
          />
          {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'পাবলিশ হচ্ছে...' : 'পাবলিশ করুন 🚀'}
        </button>
      </form>
    </div>
  );
}