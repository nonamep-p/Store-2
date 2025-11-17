'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { products, categories, tags } from '@/lib/data';
import { ProductCard } from '@/components/app/product-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function ProductPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesTag =
        selectedTags.length === 0 ||
        product.tags.some((tag) => selectedTags.includes(tag));
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategories, selectedTags, searchQuery]);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Separator className="my-4" />
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-6 pr-4">
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <div className="mt-3 space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`cat-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Tags</h3>
                  <div className="mt-3 space-y-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="capitalize">{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
             {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                <>
                <Separator className="my-4" />
                <Button onClick={clearFilters} variant="secondary" className="w-full">Clear Filters</Button>
                </>
             )}
          </div>
        </aside>

        <main className="md:col-span-3">
          <h1 className="mb-6 text-3xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No products found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductPageContent />
    </Suspense>
  )
}

function ProductPageSkeleton() {
  return (
     <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <Skeleton className="h-[calc(100vh-8rem)] w-full" />
        </aside>
        <main className="md:col-span-3">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
