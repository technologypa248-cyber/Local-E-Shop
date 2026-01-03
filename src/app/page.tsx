import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { getCategories, getProducts } from '@/lib/actions/products';
import { IProduct } from '@/models/Product';
import { ICategory } from '@/models/Category';
import { Suspense } from 'react';

interface HomeProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

async function ProductsList({ category, search }: { category?: string, search?: string }) {
  const products: IProduct[] = await getProducts({ 
    category: category,
    search: search 
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No Products Found</h2>
        <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product._id.toString()} product={product} />
      ))}
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const categories: ICategory[] = await getCategories();

  return (
    <div className="container py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline md:text-5xl">
          Discover Our Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our curated selection of high-quality products, available exclusively on your local network.
        </p>
      </section>

      <ProductFilters categories={categories} />

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsList category={searchParams.category} search={searchParams.search} />
      </Suspense>
    </div>
  );
}
