import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import {Mail, MapPin, Phone, } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              RentNest
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              RentNest is a modern rental platform that connects tenants
              with trusted property owners through a fast, secure and
              user-friendly experience.
            </p>

            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaLinkedin size={18}/>
              </a>

            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link href="/" className="block hover:text-indigo-400">
                Home
              </Link>

              <Link
                href="/properties"
                className="block hover:text-indigo-400"
              >
                Properties
              </Link>

              <Link
                href="/about"
                className="block hover:text-indigo-400"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block hover:text-indigo-400"
              >
                Contact
              </Link>

            </div>
          </div>

          {/* Services */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Services
            </h3>

            <div className="space-y-3">

              <p>Apartment Rent</p>

              <p>House Rent</p>

              <p>Property Management</p>

              <p>Secure Payments</p>

            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+880 1940189750</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>abusaleh233@gamil.com</span>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} RentNest. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}