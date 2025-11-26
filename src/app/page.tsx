import { products } from '@/lib/data';
import { Hero } from '@/components/app/hero';
import { StackedProductDisplay } from '@/components/app/stacked-product-display';
import { CountdownTimer } from '@/components/app/countdown-timer';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const nextDropDate = new Date();
  nextDropDate.setDate(nextDropDate.getDate() + 7);

  return (
    <>
      <Hero />
      <StackedProductDisplay products={featuredProducts} />
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <CountdownTimer targetDate={nextDropDate} />
          </div>
        </div>
      </section>
    </>
  );
}
