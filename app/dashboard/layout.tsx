'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiClient } from '../lib/api-client';


interface UserProfile {
  name: string;
  email: string;
  role: 'USER' | 'OWNER' | 'ADMIN';
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadUserProfile() {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await apiClient.get('/users/me');
        setUser(res.data?.data || res.data);
      } catch (err) {
        console.error('User fetch error:', err);
        Cookies.remove('token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-indigo-600"></div>
        </div>
      </div>
    );
  }

  const getNavLinks = () => {
    switch (user?.role) {
      case 'OWNER':
        return [
          {
            name: 'Dashboard',
            href: '/dashboard/owner',
            icon: '📊',
          },
          {
            name: 'My Properties',
            href: '/dashboard/owner/properties',
            icon: '🏠',
          },
          {
            name: 'Add Property',
            href: '/dashboard/owner/properties/new',
            icon: '➕',
          },
          {
            name: 'Rental Requests',
            href: '/dashboard/owner/requests',
            icon: '📩',
          },
        ];
      case 'ADMIN':
        return [
          { name: 'অ্যাডমিন ড্যাশবোর্ড', href: '/dashboard/admin', icon: '🛡️' },
          { name: 'ইউজার ম্যানেজমেন্ট', href: '/dashboard/admin/users', icon: '👥' },
        ];
      case 'USER':
      default:
        return [
          {
            name: 'Dashboard',
            href: '/dashboard/user',
            icon: '🏠',
          },
          {
            name: 'Browse Properties',
            href: '/properties',
            icon: '🔍',
          },
          {
            name: 'Payment History',
            href: '/dashboard/user/payment-history',
            icon: '💳',
          },
          {
            name: 'Profile',
            href: '/dashboard/user/profile',
            icon: '👤',
          },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800 md:flex">
        <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-black text-indigo-600 dark:text-indigo-400">
          <span>RentNest</span> 🏠
        </Link>

        <nav className="flex-1 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="mb-3 px-2">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold uppercase text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400"
          >
            <span>🚪</span> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-800 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
            >
              ☰
            </button>
            <h2 className="text-lg font-extrabold text-gray-800 dark:text-white">
              {user?.role === 'ADMIN' ? 'অ্যাডমিন প্যানেল' : user?.role === 'OWNER' ? 'মালিক প্যানেল' : 'ভাড়াটিয়া ড্যাশবোর্ড'}
            </h2>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            হোমপেজে যান 🏠
          </Link>
        </header>

        {isMobileMenuOpen && (
          <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800 md:hidden">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold ${pathname === link.href
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-xs font-bold text-white"
            >
              লগআউট
            </button>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}