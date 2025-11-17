'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';


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
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? '' : 'text-muted-foreground'
                  }`}
                  >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="flex items-center">
              {searchOpen ? (
                <motion.div initial={{width: 0}} animate={{width: 'auto'}}>
                  <form onSubmit={handleSearch}>
                    <Input
                      type="text"
                      name="search"
                      placeholder="Search products..."
                      className="bg-transparent"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                      defaultValue={defaultSearch}
                    />
                  </form>
                </motion.div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-foreground hover:bg-accent"
                >
                  <Search className="w-5 h-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div >

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground hover:bg-accent"
            >
              <Heart className="w-5 h-5" />
              <span className="sr-only">Wishlist</span>
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
                      className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                  <span className="sr-only">Open Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <CartSheetContent />
              </SheetContent>
            </Sheet>


            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground hover:bg-accent"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="container pb-6 space-y-4">
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
    </motion.nav>
  );
}
