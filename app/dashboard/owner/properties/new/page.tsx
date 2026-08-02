'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from 'js-cookie';

const propertySchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  price: z.coerce.number().min(1000, {
    message: 'Please enter a valid price',
  }),
  location: z.string().min(3, {
    message: 'Please enter the property location',
  }),
  categoryId: z.string().min(1, {
    message: 'Please select a category',
  }),
});

type PropertyFormData = z.input<typeof propertySchema>;

interface Category {
  id: string;
  name: string;
}

export default function CreatePropertyPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          'https://rentnest-backend-sage.vercel.app/api/categories'
        );

        const result = await res.json();

        setCategories(result?.data || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
  }, []);

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    setError(null);

    const token = Cookies.get('token');

    try {
      const res = await fetch(
        'https://rentnest-backend-sage.vercel.app/api/properties',
        {
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
            categoryId: data.categoryId,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to create property.');
      }

      router.push('/dashboard/owner');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
         List a New Property  🏠
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Fill in your property details and publish your listing.
      </p>

      {error && (
        <div className="mt-5 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Property Title
          </label>

          <input
            {...register('title')}
            type="text"
            placeholder="2 Bedroom Apartment"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>

          <textarea
            {...register('description')}
            rows={4}
            placeholder="Write a detailed description of your property..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="mb-1 block text-sm font-medium">
           Monthly Rent
          </label>

          <input
            {...register('price')}
            type="number"
            placeholder="15000"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />

          {errors.price && (
            <p className="mt-1 text-xs text-red-600">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="mb-1 block text-sm font-medium">Location</label>

          <input
            {...register('location')}
            type="text"
            placeholder="Mirpur 10, Dhaka"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />

          {errors.location && (
            <p className="mt-1 text-xs text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium">
             Category
          </label>

          <select
            {...register('categoryId')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value=""> Select a Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="mt-1 text-xs text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Publishing...' : 'Publish Property 🚀'}
        </button>
      </form>
    </div>
  );
}