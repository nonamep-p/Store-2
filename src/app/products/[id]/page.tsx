import { notFound } from 'next/navigation';
import Image from 'next/image';

import { getProductById } from '@/lib/data';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { AddToCartButton } from '@/components/app/add-to-cart-button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductRecommendations } from '@/components/app/product-recommendations';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const placeholderImage = getPlaceholderImageById(product.image);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <Image
            src={placeholderImage?.imageUrl || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={placeholderImage?.imageHint}
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>

          <Separator className="my-8" />
          
          <div className="space-y-4 text-foreground/90">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <p className="text-base">{product.longDescription}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline">{product.category}</Badge>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto pt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <Separator className="my-16" />
      
      <Suspense fallback={<RecommendationSkeleton />}>
        <ProductRecommendations productIds={[product.id]} />
      </Suspense>
    </div>
  );
}

function RecommendationSkeleton() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
