export default function Stats() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">

        <div className="rounded-2xl border p-8 text-center shadow">

          <h2 className="text-5xl font-black text-indigo-600">
            10K+
          </h2>

          <p>Properties</p>

        </div>

        <div className="rounded-2xl border p-8 text-center shadow">

          <h2 className="text-5xl font-black text-indigo-600">
            6K+
          </h2>

          <p>Happy Tenants</p>

        </div>

        <div className="rounded-2xl border p-8 text-center shadow">

          <h2 className="text-5xl font-black text-indigo-600">
            1200+
          </h2>

          <p>Owners</p>

        </div>

        <div className="rounded-2xl border p-8 text-center shadow">

          <h2 className="text-5xl font-black text-indigo-600">
            99%
          </h2>

          <p>Success Rate</p>

        </div>

      </div>
    </section>
  );
}