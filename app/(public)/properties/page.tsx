'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
}


const propertyImages = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetch('https://rentnest-backend-sage.vercel.app/api/properties');
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data || [];
        setProperties(list);
        setFiltered(list);
      } catch (err) {
        console.error('Error loading properties:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProperties();
  }, []);

  // Handle Search & Filter logic
  useEffect(() => {
    let result = properties;

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    setFiltered(result);
  }, [searchTerm, maxPrice, properties]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white">সব ভাড়ার প্রপার্টি খুঁজুন</h1>

      {/* Filter Sidebar & Search */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">ফিল্টার করুন 🔍</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">লোকেশন বা নাম</label>
              <input
                type="text"
                placeholder="ঢাকা, ধানমন্ডি..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                সর্বোচ্চ বাজেট: ৳{maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="2000"
                max="1000000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full accent-indigo-600"
              />
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setMaxPrice(100000);
              }}
              className="w-full rounded-md border border-gray-300 py-2 text-xs font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Property Grid */}
        <main className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-72 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
              কোনো প্রপার্টি পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
                >
                  <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={propertyImages[index % propertyImages.length]}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-indigo-600">৳{item.price}</span>
                      <Link
                        href={`/properties/${item.id}`}
                        className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs text-white hover:bg-indigo-700"
                      >
                        বিস্তারিত
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}