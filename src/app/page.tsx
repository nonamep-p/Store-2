import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/app/product-card';
import { getPlaceholderImageById } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = getPlaceholderImageById(featuredProducts[3].image);

  return (
    <>
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-accent overflow-hidden">
        {heroImage && (
             <Image
             src={heroImage.imageUrl}
             alt="Hero background"
             fill
             className="object-cover opacity-10"
             data-ai-hint="abstract background"
             priority
           />
        )}
        <div className="container relative z-10 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your Everyday
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80 md:text-xl">
            Discover curated goods designed for modern living. Quality and style, delivered.
            </p>
            <div className="mt-6">
            <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
            </Button>
            </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
