
'use client';

import { motion } from 'framer-motion';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { QuickViewDialogContent } from './quick-view-dialog-content';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const placeholderImage = getPlaceholderImageById(product.image);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Dialog>
      <Card className="group overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Link href={`/products/${product.id}`}>
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
              <Image
                src={placeholderImage?.imageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={placeholderImage?.imageHint}
              />
              </motion.div>
            </Link>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
            >
              <DialogTrigger asChild>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Quick view"
                    className="bg-white/90 hover:bg-white text-foreground"
                    >
                    <Eye className="w-5 h-5" />
                    </Button>
                </motion.div>
              </DialogTrigger>
               <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <Button
                    size="icon"
                    onClick={() => addToCart(product)}
                    aria-label="Add to cart"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                    <ShoppingCart className="w-5 h-5" />
                    </Button>
                </motion.div>
            </motion.div>


            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.tags.includes('new') && <Badge>NEW</Badge>}
              {product.tags.includes('sale') && <Badge variant="destructive">SALE</Badge>}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorited(!isFavorited);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-foreground"
                }`}
              />
            </motion.button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
            <h3 className="text-base font-semibold truncate">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-primary">
                ${product.price.toFixed(2)}
                </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl p-0 border-0">
        <QuickViewDialogContent product={product} />
      </DialogContent>
    </Dialog>
  );
}
