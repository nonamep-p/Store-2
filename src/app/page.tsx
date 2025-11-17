import Link from 'next/link';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/app/product-card';
import { Hero } from '@/components/app/hero';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

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
