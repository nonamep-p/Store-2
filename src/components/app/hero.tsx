'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { getPlaceholderImageById } from "@/lib/placeholder-images";

export function Hero() {
    const heroImage = getPlaceholderImageById("13");
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
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
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-purple-400 mb-4 tracking-widest uppercase"
            >
              Exclusive Collection
            </motion.p>

            <h1 className="text-white mb-6 max-w-4xl mx-auto">
              Step Into the{" "}
              <span className="gradient-text">Future</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/70 mb-8 max-w-2xl mx-auto"
            >
              Discover premium sneakers that blend cutting-edge design with unparalleled comfort.
              Shop the latest drops from the world's most coveted brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-6"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6"
              >
                View Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
