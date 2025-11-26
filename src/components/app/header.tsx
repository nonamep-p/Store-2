
'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems } = useCart();
  const defaultSearch = searchParams.get('q') || '';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    router.push(`/products?q=${searchQuery}`);
    setSearchOpen(false);
  };
  
  const navLinks = [
    { href: '/products', label: 'All Products' },
    { href: '#', label: 'New Arrivals' },
    { href: '#', label: 'Collections' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Toggle (Left) */}
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground hover:bg-accent"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          
          <div className="hidden lg:block">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="block lg:hidden">
            <Logo />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search */}
            <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-foreground hover:bg-accent"
                >
                  <Search className="w-5 h-5" />
                  <span className="sr-only">Search</span>
                </Button>
            </div >
            
            <Button asChild variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                <Link href="/login"><User className="w-5 h-5" /></Link>
            </Button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground hover:bg-accent"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                  <span className="sr-only">Open Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle>
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6 text-primary" />
                        <span className="font-semibold">Shopping Cart</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <CartSheetContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0}}
            animate={{ height: 'auto', opacity: 1}}
            exit={{ height: 0, opacity: 0}}
            className="overflow-hidden lg:absolute lg:top-full lg:left-0 lg:right-0 lg:bg-background lg:border-b"
          >
            <div className="container py-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search for products..."
                  className="w-full bg-transparent pl-10"
                  autoFocus
                  defaultValue={defaultSearch}
                />
              </div>
            </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
          >
            <div className="container py-4 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                <Link
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
