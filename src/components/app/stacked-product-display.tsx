'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface StackedProductDisplayProps {
  products: Product[];
}

export function StackedProductDisplay({ products }: StackedProductDisplayProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.8]);
  const scaleCard2 = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0.4, 1], ['0%', '-100%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen w-full">
        <div className="relative flex h-full items-center justify-center">
          <h2 className="absolute top-16 text-center text-4xl font-bold tracking-tight md:text-5xl">
            This Season&apos;s Hottest Picks
          </h2>
          {products.map((product, i) => {
            const range: [number, number] = [i * 0.1, 1];
            const cardScale = useTransform(scrollYProgress, range, [1, 0.85]);
            const cardRotate = useTransform(scrollYProgress, range, [0, -20 + i * 10]);

            return (
              <motion.div
                key={product.id}
                style={{
                  scale: cardScale,
                  rotate: cardRotate,
                  top: `${25 + i * 5}%`,
                }}
                className="absolute w-[90vw] max-w-sm"
              >
                <ProductCard product={product} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
