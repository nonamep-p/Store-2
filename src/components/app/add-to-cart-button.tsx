'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-xl font-medium">{quantity}</span>
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
  );
}
