'use client';

import {
  ShieldCheck,
  House,
  CreditCard,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: House,
    title: 'Verified Properties',
    description:
      'Browse hundreds of verified rental properties with complete information.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description:
      'Your personal information and payments are protected with secure authentication.',
  },
  {
    icon: CreditCard,
    title: 'Easy Online Payment',
    description:
      'Pay your monthly rent securely using Stripe in just a few clicks.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Search and request rentals anytime from anywhere.',
  },
  {
    icon: MapPin,
    title: 'Best Locations',
    description:
      'Find homes in popular cities and prime residential locations.',
  },
  {
    icon: Users,
    title: 'Trusted Community',
    description:
      'Connect with trusted landlords and verified tenants.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-indigo-600">
            WHY CHOOSE RENTNEST
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Everything You Need to Rent a Home
          </h2>

          <p className="mt-4 text-gray-600">
            RentNest provides a simple, secure and modern rental experience
            for both tenants and property owners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 transition group-hover:bg-indigo-600">
                  <Icon
                    size={32}
                    className="text-indigo-600 group-hover:text-white"
                  />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}