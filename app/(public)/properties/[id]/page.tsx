'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  owner?: { name: string; email: string };
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`https://rentnest-backend-sage.vercel.app/api/properties/${id}`);
        const data = await res.json();
        setProperty(data?.data || data);
      } catch (err) {
        console.error('Error details fetch:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  const handleRentalRequest = async () => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setRequestLoading(true);
    setMessage(null);

    try {
      const res = await fetch('https://rentnest-backend-sage.vercel.app/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: id,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ).toISOString(),
          totalPrice: property?.price,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে।');
      }

      setMessage('আপনার রেন্ট রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে! মালিক অনুমোদন দেওয়া পর্যন্ত অপেক্ষা করুন।');
    } catch (error: any) {
      setMessage(error.message || 'একটি ত্রুটি ঘটেছে');
    } finally {
      setRequestLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">প্রপার্টি ডিটেইলস লোড হচ্ছে...</div>;
  }

  if (!property) {
    return <div className="p-8 text-center text-red-500">প্রপার্টিটি পাওয়া যায়নি!</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{property.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{property.location}</p>

      {/* Image Gallery */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative h-80 md:col-span-2 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={property.images?.[1] || property.images?.[0] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-36 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={property.images?.[2] || property.images?.[0] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Details & CTA */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">বিবরণ</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {property.description || 'এই প্রপার্টির কোনো বিস্তারিত বিবরণ দেওয়া নেই।'}
          </p>

          {property.owner && (
            <div className="rounded-xl border border-gray-200 p-4 mt-6 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">বাড়িওয়ালার তথ্য</h3>
              <p className="text-sm text-gray-500">{property.owner.name}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-fit dark:border-gray-800 dark:bg-gray-800">
          <div className="text-2xl font-extrabold text-indigo-600">
            ৳{property.price} <span className="text-xs font-normal text-gray-500">/ মাস</span>
          </div>

          {message && (
            <div className="my-4 rounded-md bg-indigo-50 p-3 text-xs text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {message}
            </div>
          )}

          <button
            onClick={handleRentalRequest}
            disabled={requestLoading}
            className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {requestLoading ? 'রিকোয়েস্ট প্রসেসিং...' : 'Request to Rent 🏠'}
          </button>
        </div>
      </div>
    </div>
  );
}