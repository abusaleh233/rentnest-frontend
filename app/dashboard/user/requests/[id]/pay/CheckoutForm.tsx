'use client';

import { useState } from 'react';
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

export default function CheckoutForm({ rentalRequestId }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    // Stripe Payment
    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (result.error) {
      setMessage(result.error.message || 'Payment Failed');
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get('token');

      await fetch(
        'https://rentnest-backend-sage.vercel.app/api/payments/confirm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rentalRequestId,
            transactionId: result.paymentIntent?.id,
          }),
        }
      );

      router.push('/payment/success');
    } catch (err) {
      console.error(err);
      router.push('/payment/cancel');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <PaymentElement />

      {message && (
        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {message}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now 💳'}
      </button>
    </form>
  );
}