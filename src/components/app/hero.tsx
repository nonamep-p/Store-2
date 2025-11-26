
'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { getPlaceholderImageById } from "@/lib/placeholder-images";
import Link from 'next/link';

export function Hero() {
    const heroImage = getPlaceholderImageById("13");
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt="Premium Sneakers"
                fill
                className="w-full h-full object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary mb-4 tracking-widest uppercase font-semibold"
            >
              Elevate Your Everyday
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              Curated Goods for a Life Well-Lived
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 mb-8 max-w-2xl mx-auto text-lg"
            >
              Discover high-quality products that blend form, function, and purpose. Built to last and designed to inspire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg">
                <Link href="#our-story">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
