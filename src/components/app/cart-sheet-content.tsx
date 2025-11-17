'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, X } from 'lucide-react';

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

  if (totalItems === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
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
      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-6">
          {cart.map((item) => {
            const placeholderImage = getPlaceholderImageById(item.product.image);
            return (
              <div key={item.product.id} className="flex items-start gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={placeholderImage?.imageUrl || '/placeholder.svg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={placeholderImage?.imageHint}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center gap-1 rounded-md border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
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
      <SheetFooter className="mt-auto border-t p-6">
        <div className="w-full space-y-4">
            <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
                Shipping and taxes will be calculated at checkout.
            </p>
            <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
            </SheetClose>
        </div>
      </SheetFooter>
    </>
  );
}

function RecommendationSkeleton() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Based on your cart</h2>
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
