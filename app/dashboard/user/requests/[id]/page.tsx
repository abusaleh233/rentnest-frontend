'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface Rental {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  startDate: string;
  endDate: string;
  totalPrice: number;
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    owner: {
      name: string;
      email: string;
    };
  };
}

export default function RentalDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState<Rental | null>(null);

  useEffect(() => {
    loadRental();
  }, []);

  async function loadRental() {
    try {
      const token = Cookies.get('token');

      const res = await fetch(
        `https://rentnest-backend-sage.vercel.app/api/rentals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      setRental(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Rental Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8">

      <div className="rounded-2xl border bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Rental Details
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">Property</p>

            <h2 className="text-2xl font-bold">
              {rental.property.title}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Description</p>

            <p>{rental.property.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>

            <p>{rental.property.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Monthly Rent</p>

            <p className="font-semibold text-indigo-600">
              ৳ {rental.property.price}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Start Date
              </p>

              <p>
                {new Date(rental.startDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                End Date
              </p>

              <p>
                {new Date(rental.endDate).toLocaleDateString()}
              </p>
            </div>

          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Price
            </p>

            <p className="text-xl font-bold text-green-600">
              ৳ {rental.totalPrice}
            </p>
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                rental.status === 'APPROVED'
                  ? 'bg-green-100 text-green-700'
                  : rental.status === 'REJECTED'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {rental.status}
            </span>

          </div>

          <div className="rounded-xl bg-gray-50 p-5">

            <h3 className="mb-3 text-lg font-bold">
              Property Owner
            </h3>

            <p>
              <strong>Name:</strong>{' '}
              {rental.property.owner.name}
            </p>

            <p>
              <strong>Email:</strong>{' '}
              {rental.property.owner.email}
            </p>

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          {rental.status === 'APPROVED' && (
            <Link
              href={`/dashboard/user/requests/${rental.id}/pay`}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white"
            >
              Pay Now 💳
            </Link>
          )}

          <Link
            href="/dashboard/user"
            className="rounded-lg bg-gray-700 px-6 py-3 text-white"
          >
            Back
          </Link>

        </div>

      </div>

    </div>
  );
}