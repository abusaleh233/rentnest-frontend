"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-indigo-600">
          Contact Us
        </h1>

        <p className="mt-5 text-lg text-gray-500">
          We'd love to hear from you.
        </p>

      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">

        {/* Contact Info */}

        <div className="space-y-8">

          <div className="rounded-2xl border bg-white p-8 shadow">

            <h2 className="mb-5 text-2xl font-bold">
              Contact Information
            </h2>

            <div className="space-y-4">

              <p>
                📍 <strong>Address:</strong>
                <br />
                Dhaka, Bangladesh
              </p>

              <p>
                📞 <strong>Phone:</strong>
                <br />
                +880 1XXXXXXXXX
              </p>

              <p>
                📧 <strong>Email:</strong>
                <br />
                support@rentnest.com
              </p>

              <p>
                🌐 <strong>Website:</strong>
                <br />
                www.rentnest.com
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-indigo-600 p-8 text-white">

            <h2 className="text-2xl font-bold">
              Working Hours
            </h2>

            <p className="mt-5">
              Monday - Friday
            </p>

            <p>9:00 AM - 6:00 PM</p>

            <p className="mt-4">
              Saturday
            </p>

            <p>10:00 AM - 3:00 PM</p>

          </div>

        </div>

        {/* Contact Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow"
        >

          <h2 className="mb-6 text-2xl font-bold">
            Send Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="mb-4 w-full rounded-lg border p-3"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="mb-4 w-full rounded-lg border p-3"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            rows={6}
            placeholder="Your Message"
            className="mb-6 w-full rounded-lg border p-3"
            required
          />

          <button
            className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white"
          >
            Send Message
          </button>

          {submitted && (
            <div className="mt-6 rounded-lg bg-green-100 p-4 text-center font-semibold text-green-700">
              ✅ Your message has been sent successfully.
            </div>
          )}

        </form>

      </div>

    </div>
  );
}