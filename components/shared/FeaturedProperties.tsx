'use client';

import Link from 'next/link';

const properties = [
  {
    id: 1,
    title: 'Luxury Apartment',
    location: 'Dhaka',
    price: 25000,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
  },
  {
    id: 2,
    title: 'Family House',
    location: 'Chittagong',
    price: 18000,
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
  },
  {
    id: 3,
    title: 'Modern Studio',
    location: 'Sylhet',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800',
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Featured Properties
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Explore our most popular rental properties.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  {property.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  📍 {property.location}
                </p>

                <p className="mt-4 text-2xl font-bold text-indigo-600">
                  ৳ {property.price}
                  <span className="text-base font-normal text-gray-500">
                    /month
                  </span>
                </p>

                <Link
                  href="/properties"
                  className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}