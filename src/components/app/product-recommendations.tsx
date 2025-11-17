import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProductsByIds } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './product-card';

interface ProductRecommendationsProps {
  productIds: string[];
  numberOfRecommendations?: number;
  title?: string;
  className?: string;
}

export async function ProductRecommendations({
  productIds,
  numberOfRecommendations = 4,
  title = 'You Might Also Like',
  className
}: ProductRecommendationsProps) {
  if (!productIds || productIds.length === 0) {
    return null;
  }

  let recommendedProducts = [];
  try {
    const recommendations = await getProductRecommendations({
      productIds,
      numberOfRecommendations,
    });
    
    recommendedProducts = getProductsByIds(recommendations.recommendedProductIds);
  } catch (error) {
    console.error('Failed to get product recommendations:', error);
    return null;
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
}
