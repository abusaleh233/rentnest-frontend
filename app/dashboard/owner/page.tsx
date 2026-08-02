'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  isAvailable: boolean;
  ownerId: string;
}

interface Rental {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface JwtPayload {
  id: string;
}

export default function OwnerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const token = Cookies.get('token');

      
      if (!token) {
        setLoading(false);
        return;
      }

      
      let decoded: JwtPayload;
      try {
        decoded = jwtDecode<JwtPayload>(token);
      } catch (err) {
        console.error('Invalid token format:', err);
        setLoading(false);
        return;
      }

      const [propertyRes, rentalRes] = await Promise.all([
        fetch('https://rentnest-backend-sage.vercel.app/api/properties'),
        fetch('https://rentnest-backend-sage.vercel.app/api/rentals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const propertyJson = await propertyRes.json();
      const rentalJson = await rentalRes.json();

      const myProperties = (propertyJson.data || []).filter(
        (item: Property) => item.ownerId === decoded.id
      );

      setProperties(myProperties);
      setRentals(rentalJson.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      
      setLoading(false);
    }
  }

  const pending = rentals.filter((r) => r.status === 'PENDING').length;
  const approved = rentals.filter((r) => r.status === 'APPROVED').length;
  const available = properties.filter((p) => p.isAvailable).length;

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">🏠 Owner Dashboard</h1>
        <p className="mt-2 text-gray-500">Welcome Back!</p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Total Properties</p>
          <h2 className="mt-2 text-4xl font-bold text-indigo-600">
            {properties.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Pending Requests</p>
          <h2 className="mt-2 text-4xl font-bold text-yellow-500">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Approved</p>
          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {approved}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">Available</p>
          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {available}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-bold">⚡ Quick Actions</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/dashboard/owner/properties/new"
            className="rounded-xl bg-indigo-600 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">➕</div>
            <h3 className="mt-4 text-xl font-bold">Add Property</h3>
            <p className="mt-2 text-sm opacity-90">
              Create a new rental property listing.
            </p>
          </Link>

          <Link
            href="/dashboard/owner/properties"
            className="rounded-xl bg-green-600 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">🏠</div>
            <h3 className="mt-4 text-xl font-bold">My Properties</h3>
            <p className="mt-2 text-sm opacity-90">
              View, edit and delete your properties.
            </p>
          </Link>

          <Link
            href="/dashboard/owner/requests"
            className="rounded-xl bg-orange-500 p-6 text-white shadow transition hover:scale-105"
          >
            <div className="text-5xl">📩</div>
            <h3 className="mt-4 text-xl font-bold">Rental Requests</h3>
            <p className="mt-2 text-sm opacity-90">
              Approve or reject rental requests.
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Properties Section */}
      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">🏠 Recent Properties</h2>
          <Link
            href="/dashboard/owner/properties"
            className="text-indigo-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {properties.slice(0, 4).map((property) => (
              <div
                key={property.id}
                className="rounded-xl border bg-white p-5 shadow"
              >
                <h3 className="text-xl font-bold">{property.title}</h3>
                <p className="mt-2 text-gray-500">📍 {property.location}</p>
                <p className="mt-2 text-lg font-semibold text-indigo-600">
                  ৳ {property.price}
                </p>

                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    property.isAvailable
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {property.isAvailable ? 'Available' : 'Unavailable'}
                </span>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/dashboard/owner/properties/${property.id}/edit`}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <Link
                    href="/dashboard/owner/properties"
                    className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Rental Requests Section */}
      <div className="my-12">
        <h2 className="mb-5 text-2xl font-bold">📩 Recent Rental Requests</h2>

        {rentals.length === 0 ? (
          <p className="text-gray-500">No rental requests found.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Request ID</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rentals.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{item.id.slice(0, 10)}...</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          item.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}