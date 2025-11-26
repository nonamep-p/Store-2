
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface QuickViewDialogContentProps {
  product: Product;
}

export function QuickViewDialogContent({ product }: QuickViewDialogContentProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("9");
  const placeholderImage = getPlaceholderImageById(product.image);

  const images = [placeholderImage, placeholderImage, placeholderImage];
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    toast({
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist.`,
    });
  }

  const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
       <div className="flex flex-col gap-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
                src={images[selectedImage]?.imageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={images[selectedImage]?.imageHint}
            />
        </motion.div>
        <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
            <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
            >
                <Image
                src={img?.imageUrl || '/placeholder.svg'}
                alt={`${product.name} ${idx + 1}`}
                fill
                className="object-cover"
                data-ai-hint={img?.imageHint}
                />
            </motion.button>
            ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 mb-2">
            {product.tags.includes('new') && (
                <Badge className="bg-primary text-primary-foreground">NEW</Badge>
            )}
            {product.tags.includes('sale') && (
                <Badge variant="destructive">SALE</Badge>
            )}
        </div>
        <p className="text-muted-foreground mb-1">{product.category}</p>
        <h2 className="text-3xl font-bold mb-3">{product.name}</h2>

        <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-muted-foreground mb-6">
          {product.longDescription}
        </p>

        <div className="mb-6">
            <Label className="mb-3 block font-semibold">Select Size</Label>
            <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="py-3 text-sm transition-all"
                >
                    {size}
                </Button>
                ))}
            </div>
        </div>

        <div className="mb-8">
            <Label className="mb-3 block font-semibold">Quantity</Label>
            <div className="flex items-center gap-4">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
                <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center text-xl font-bold">{quantity}</span>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
            >
                <Plus className="w-4 h-4" />
            </Button>
            </div>
        </div>

        <div className="flex gap-4 mt-auto">
            <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
            >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleAddToWishlist}>
                <Heart className="w-5 h-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}
