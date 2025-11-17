'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, ShoppingCart } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { useCart } from '@/context/cart-context';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QuickViewDialogContent } from './quick-view-dialog-content';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const placeholderImage = getPlaceholderImageById(product.image);

  return (
    <Dialog>
      <Card className="group overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <Image
                src={placeholderImage?.imageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholderImage?.imageHint}
              />
            </Link>
            <div className="absolute left-3 top-3 flex flex-wrap gap-1">
              {product.tags.map(tag => (
                <Badge key={tag} variant={tag === 'sale' ? 'destructive' : 'secondary'} className="text-xs capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="absolute bottom-0 right-0 m-2 flex translate-y-10 transform-gpu flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary" aria-label="Quick view">
                  <Eye className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <Button
                size="icon"
                onClick={() => addToCart(product)}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-2 font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl">
        <QuickViewDialogContent product={product} />
      </DialogContent>
    </Dialog>
  );
}
