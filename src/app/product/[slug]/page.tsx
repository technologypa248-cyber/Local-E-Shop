import { getProductBySlug } from '@/lib/actions/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';
import placeholderImages from '@/lib/placeholder-images.json';
import { Metadata } from 'next';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: `${product.title} | E-SHOP`,
    description: product.description,
  };
}


export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }
  
  const image = placeholderImages.placeholderImages.find(img => product.images.includes(img.imageUrl));

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src={product.images[0] || "https://picsum.photos/seed/placeholder/600/600"}
            alt={product.title}
            width={800}
            height={800}
            className="w-full h-full object-cover aspect-square"
            data-ai-hint={image?.imageHint || 'product photo'}
          />
        </div>
        <div className="flex flex-col">
          {product.category && (
            <Badge variant="secondary" className="w-fit mb-2">{product.category.name}</Badge>
          )}
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-4">{product.title}</h1>
          <p className="text-muted-foreground text-base mb-6">{product.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700">
                {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
              </Badge>
            </div>
            {product.stock > 0 ? (
              <AddToCartButton product={product} />
            ) : (
                <p className="text-destructive font-medium">This product is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
