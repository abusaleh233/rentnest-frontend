import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-indigo-600">
          About RentNest
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          RentNest is a modern rental property platform that helps tenants
          discover their perfect home while enabling property owners to manage
          rentals efficiently.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-8 shadow">
          <div className="text-5xl">🏠</div>

          <h2 className="mt-4 text-2xl font-bold">
            Find Properties
          </h2>

          <p className="mt-3 text-gray-500">
            Browse apartments, flats, family homes and commercial properties
            with complete information.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow">
          <div className="text-5xl">💳</div>

          <h2 className="mt-4 text-2xl font-bold">
            Secure Payment
          </h2>

          <p className="mt-3 text-gray-500">
            Pay your monthly rent securely through Stripe with complete payment
            history.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow">
          <div className="text-5xl">📋</div>

          <h2 className="mt-4 text-2xl font-bold">
            Easy Management
          </h2>

          <p className="mt-3 text-gray-500">
            Owners can approve requests, manage properties and monitor rentals
            from one dashboard.
          </p>
        </div>

      </div>

      <div className="mt-20 rounded-3xl bg-indigo-600 p-12 text-center text-white">

        <h2 className="text-4xl font-bold">
          Why Choose RentNest?
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg opacity-90">
          We simplify the rental experience by connecting property owners and
          tenants through a secure, user-friendly and reliable platform.
        </p>

        <Link
          href="/properties"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-indigo-600"
        >
          Browse Properties
        </Link>

      </div>
    </div>
  );
}