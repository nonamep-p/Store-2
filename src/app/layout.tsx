import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Zenith Market',
  description: 'Elevate Your Everyday with Curated Goods from Zenith Market',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
