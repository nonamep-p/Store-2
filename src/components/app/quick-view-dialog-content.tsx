'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QuickViewDialogContentProps {
  product: Product;
}

export function QuickViewDialogContent({ product }: QuickViewDialogContentProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const placeholderImage = getPlaceholderImageById(product.image);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={placeholderImage?.imageUrl || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover"
          data-ai-hint={placeholderImage?.imageHint}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="mt-2 text-muted-foreground">{product.description}</p>
        <p className="mt-4 text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
        
        <Separator className="my-6" />

        <p className="text-sm">{product.longDescription}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline">{product.category}</Badge>
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
