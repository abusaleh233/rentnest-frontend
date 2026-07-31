import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RentNest | Find Your Dream Home',
  description: 'Rent and list properties easily with RentNest.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full">
      <body className={`${inter.className} flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100`}>
        {/* Header/Navbar Component can be added here */}
        <main className="flex-1">{children}</main>
        {/* Footer Component can be added here */}
      </body>
    </html>
  );
}