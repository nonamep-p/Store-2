
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ProductRecommendations } from './product-recommendations';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

export function CartSheetContent() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const cartProductIds = cart.map(item => item.product.id);
  const shipping = totalPrice > 0 ? 0 : 0;
  const total = totalPrice + shipping;

  if (totalItems === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything yet.
        </p>
        <SheetClose asChild>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {cart.map((item) => {
             const placeholderImage = getPlaceholderImageById(item.product.image);
            return (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 bg-muted rounded-lg"
              >
                <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={placeholderImage?.imageUrl || '/placeholder.svg'}
                    alt={item.product.name}
                    fill
                    className="w-full h-full object-cover"
                    data-ai-hint={placeholderImage?.imageHint}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold mb-1 truncate">{item.product.name}</h4>
                  <p className="font-bold">${item.product.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                      }
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="self-start p-2 hover:bg-muted-foreground/20 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </motion.div>
            );
          })}
        </div>
        <Separator className="my-6" />
        <Suspense fallback={<RecommendationSkeleton />}>
          <ProductRecommendations 
            productIds={cartProductIds}
            numberOfRecommendations={2}
            title="Based on your cart"
          />
        </Suspense>
      </ScrollArea>
      {cart.length > 0 && (
         <SheetFooter className="mt-auto border-t p-6 space-y-4">
            <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Checkout</Link>
                </Button>
            </SheetClose>
        </SheetFooter>
      )}
    </>
  );
}

function RecommendationSkeleton() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">Based on your cart</h2>
      <div className="flex space-x-4">
        <div className="w-1/2 space-y-2">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-1/2 space-y-2">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
