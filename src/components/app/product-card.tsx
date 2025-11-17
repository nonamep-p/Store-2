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
              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2"
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
                    className="bg-white/90 hover:bg-white"
                    >
                    <Eye className="w-5 h-5 text-black" />
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
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                    <ShoppingCart className="w-5 h-5" />
                    </Button>
                </motion.div>
            </motion.div>


            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} className={`${tag === 'new' ? 'bg-purple-500' : tag === 'sale' ? 'bg-red-500' : 'bg-secondary'} text-white capitalize`}>
                  {tag}
                </Badge>
              ))}
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
                className={`w-5 h-5 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-black"
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
            
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "auto", opacity: 1}}
                className="overflow-hidden"
            >
                <div className="flex gap-2 mt-3">
                    {["7", "8", "9", "10", "11"].map((size) => (
                    <button
                        key={size}
                        className="px-2 py-1 text-xs border border-white/20 rounded hover:bg-white/10 transition-colors"
                    >
                        {size}
                    </button>
                    ))}
                </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl">
        <QuickViewDialogContent product={product} />
      </DialogContent>
    </Dialog>
  );
}
