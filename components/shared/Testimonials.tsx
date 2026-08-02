'use client';

const testimonials = [
  {
    id: 1,
    name: 'Rahim Ahmed',
    role: 'Tenant',
    image: 'https://i.pravatar.cc/150?img=11',
    review:
      'RentNest made finding a rental home incredibly easy. The booking and payment process was smooth and secure.',
  },
  {
    id: 2,
    name: 'Fatema Akter',
    role: 'Property Owner',
    image: 'https://i.pravatar.cc/150?img=32',
    review:
      'Managing my properties has never been easier. I can approve requests and track payments from one dashboard.',
  },
  {
    id: 3,
    name: 'Nafis Hasan',
    role: 'Tenant',
    image: 'https://i.pravatar.cc/150?img=18',
    review:
      'Beautiful UI, quick response, and trusted property listings. Highly recommended for renters.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            What Our Users Say
          </h2>

          <p className="mt-3 text-gray-500">
            Trusted by tenants and property owners across Bangladesh.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mb-8 leading-7 text-gray-600">
                "{item.review}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-bold">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}