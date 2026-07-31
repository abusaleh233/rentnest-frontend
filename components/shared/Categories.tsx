const categories = [
  "Apartment",
  "House",
  "Villa",
  "Studio",
  "Office",
  "Commercial",
];

export default function Categories() {
  return (
    <section className="py-20">

      <div className="mx-auto max-w-7xl">

        <h2 className="mb-10 text-center text-4xl font-black">

          Browse Categories

        </h2>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">

          {categories.map((item) => (

            <div
              key={item}
              className="rounded-2xl border bg-white p-8 text-center shadow transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-4 text-5xl">

                🏠

              </div>

              <h3 className="font-bold">{item}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}