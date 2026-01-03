import type { IProduct } from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from './AddToCartButton';
import placeholderImages from '@/lib/placeholder-images.json';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const image = placeholderImages.placeholderImages.find(img => product.images.includes(img.imageUrl));

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="block overflow-hidden">
          <Image
            src={product.images[0] || "https://picsum.photos/seed/placeholder/600/600"}
            alt={product.title}
            width={600}
            height={600}
            className="aspect-square object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={image?.imageHint || 'product photo'}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        {product.category && (
            <Badge variant="secondary" className="mb-2">{product.category.name}</Badge>
        )}
        <Link href={`/product/${product.slug}`}>
          <CardTitle className="text-lg font-medium leading-tight hover:text-primary">
            {product.title}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
