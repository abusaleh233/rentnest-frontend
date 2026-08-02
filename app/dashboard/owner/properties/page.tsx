'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  isAvailable: boolean;
  ownerId: string;
  category?: {
    name: string;
  };
}

interface JwtPayload {
  id: string;
  role: string;
}

export default function OwnerPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const token = Cookies.get('token');

      if (!token) return;

      const decoded = jwtDecode<JwtPayload>(token);

      const res = await fetch(
        'https://rentnest-backend-sage.vercel.app/api/properties'
      );

      const result = await res.json();

      const list = result.data || [];

      const myProperties = list.filter(
        (item: Property) => item.ownerId === decoded.id
      );

      setProperties(myProperties);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this property?'
    );

    if (!confirmDelete) return;

    try {
      const token = Cookies.get('token');

      const res = await fetch(
        `https://rentnest-backend-sage.vercel.app/api/properties/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Delete Failed');
      }

      setProperties((prev) => prev.filter((item) => item.id !== id));

      alert('Property Deleted Successfully');
    } catch (error) {
      alert('Delete Failed');
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-6 text-3xl font-bold">My Properties</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-60 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">🏠 My Properties</h1>

        <Link
          href="/dashboard/owner/properties/new"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No Property Found
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-xl border bg-white p-6 shadow"
            >
              <h2 className="text-xl font-bold">{property.title}</h2>

              <p className="mt-2 text-gray-600">
                {property.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Location:</strong> {property.location}
                </p>

                <p>
                  <strong>Price:</strong> ৳{property.price}
                </p>

                <p>
                  <strong>Category:</strong>{' '}
                  {property.category?.name}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {property.isAvailable ? (
                    <span className="font-semibold text-green-600">
                      Available
                    </span>
                  ) : (
                    <span className="font-semibold text-red-600">
                      Unavailable
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/dashboard/owner/properties/${property.id}/edit`}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(property.id)}
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}