'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '@/components/app/logo';
import { CartSheetContent } from '@/components/app/cart-sheet-content';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { FormEvent } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems } = useCart();
  const defaultSearch = searchParams.get('q') || '';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    const params = new URLSearchParams(searchParams);
    params.set('q', searchQuery);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="mx-6 hidden items-center space-x-4 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? '' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
           {pathname.startsWith('/products') && (
            <form onSubmit={handleSearch} className="relative hidden w-full max-w-sm items-center md:flex">
                <Input
                type="text"
                name="search"
                placeholder="Search products..."
                className="pl-10"
                defaultValue={defaultSearch}
                />
                <span className="absolute inset-y-0 left-0 flex items-center py-1 pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </span>
            </form>
          )}
          <Link href="/login" legacyBehavior passHref>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User Account</span>
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <CartSheetContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
