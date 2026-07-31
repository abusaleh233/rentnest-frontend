import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-700 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              🏠 Bangladesh's Trusted Rental Platform
            </span>

            <h1 className="mt-6 text-6xl font-black leading-tight">

              Find Your

              <span className="block text-yellow-300">
                Dream Home
              </span>

            </h1>

            <p className="mt-6 text-lg text-indigo-100">

              Search thousands of verified rental properties.
              Book securely and move into your dream home.

            </p>

            <div className="mt-10 flex gap-4">

              <Link
                href="/properties"
                className="rounded-xl bg-white px-8 py-4 font-bold text-indigo-700"
              >
                Browse Properties
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white px-8 py-4"
              >
                Become Owner
              </Link>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800"
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}