
import { products } from '@/lib/data';
import { Hero } from '@/components/app/hero';
import { CountdownTimer } from '@/components/app/countdown-timer';
import { ProductCarousel } from '@/components/app/product-carousel';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaceholderImageById } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const nextDropDate = new Date();
  nextDropDate.setDate(nextDropDate.getDate() + 7);
  const storyImage = getPlaceholderImageById("9");

  const testimonials = [
    {
      name: 'Alex R.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: "The quality of the Aura Smart Lamp is insane. It completely changed the vibe of my room. 10/10 would recommend!",
      rating: 5,
    },
    {
      name: 'Jenna M.',
      avatar: 'https://i.pravatar.cc/150?img=32',
      text: "I'm in love with my Flow keyboard. It's beautiful and the typing experience is just so satisfying. Worth every penny.",
      rating: 5,
    },
    {
      name: 'Carlos V.',
      avatar: 'https://i.pravatar.cc/150?img=56',
      text: "The Nomad backpack is the best I've ever owned. So many smart pockets and it's incredibly durable. Perfect for my daily commute and weekend trips.",
      rating: 5,
    }
  ];

  return (
    <>
      <Hero />
      <section className="py-16 sm:py-24">
        <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                Featured Products
            </h2>
            <ProductCarousel products={featuredProducts} />
        </div>
      </section>

       <section className="py-16 sm:py-24 bg-secondary text-secondary-foreground">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-lg mx-auto">
            {storyImage && <Image src={storyImage.imageUrl} alt="Our Brand Story" fill className="rounded-lg object-cover shadow-lg" data-ai-hint={storyImage.imageHint} />}
          </div>
          <div>
            <p className="font-bold text-primary mb-2">Our Story</p>
            <h2 className="text-4xl font-bold mb-4">Crafted with Passion, Designed for Life</h2>
            <p className="text-muted-foreground mb-6">
              Founded on the principle of 'buy less, but better,' Zenith Market offers a curated selection of goods that are built to last. We believe in products that are not only beautiful and functional but also have a story to tell. Every item in our collection is chosen with intention, ensuring it enhances your everyday life.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border flex flex-col">
                <div className="flex items-center mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="ml-4 font-semibold">{testimonial.name}</p>
                </div>
                <div className="flex mb-3">
                    {Array.from({length: testimonial.rating}).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-muted-foreground flex-1">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
