'use client';

import { useState, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import { products } from '@/lib/data';
import { ProductCard } from '@/components/app/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterSidebar } from '@/components/app/filter-sidebar';
import { Filter } from 'lucide-react';

type Filters = {
  priceRange: [number, number];
  categories: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
};

function ProductPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 500],
    categories: [],
    tags: [],
    sizes: [],
    colors: [],
  });

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      categories: [],
      tags: [],
      sizes: [],
      colors: [],
    });
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesTag =
        filters.tags.length === 0 ||
        product.tags.some((tag) => filters.tags.includes(tag));
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

      return matchesCategory && matchesTag && matchesSearch && matchesPrice;
    });
  }, [filters, searchQuery]);

  return (
    <div className="container py-12">
      <div className="flex gap-8">
        <FilterSidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Filter />
            </Button>
          </div>

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
               <Button onClick={clearFilters} variant="secondary" className="mt-4">Clear Filters</Button>
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
        <aside className="md:col-span-1 hidden md:block">
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
