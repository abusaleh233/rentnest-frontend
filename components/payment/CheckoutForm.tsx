'use client';

import { FormEvent, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Props {
  rentalRequestId: string;
}

export default function CheckoutForm({
  rentalRequestId,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    // Confirm Stripe Payment
    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

    if (error) {
      setError(error.message || 'Payment failed');
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/confirm`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rentalRequestId,
            transactionId: paymentIntent?.id,
          }),
        }
      );

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      router.push('/payment/success');
    } catch (err) {
      console.error(err);
      router.push('/payment/cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <PaymentElement />

      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-red-600">
          {error}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading
          ? 'Processing Payment...'
          : 'Pay Now 💳'}
      </button>
    </form>
  );
}