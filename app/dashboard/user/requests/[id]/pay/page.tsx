'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import CheckoutForm from '@/components/payment/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  async function createPaymentIntent() {
    try {
      const token = Cookies.get('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-intent`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rentalRequestId: id,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setClientSecret(result.data.clientSecret);
        setAmount(result.data.amount);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Payment...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-8">

      <div className="rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold">
          Stripe Payment
        </h1>

        <div className="mb-8 rounded-xl bg-indigo-50 p-5">

          <p className="text-gray-500">
            Rental Request ID
          </p>

          <p className="font-semibold">
            {id}
          </p>

          <p className="mt-5 text-gray-500">
            Amount
          </p>

          <h2 className="text-3xl font-bold text-indigo-600">
            ${amount}
          </h2>

        </div>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <CheckoutForm
              rentalRequestId={id as string}
            />
          </Elements>
        )}

      </div>

    </div>
  );
}