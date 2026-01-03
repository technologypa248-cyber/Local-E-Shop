'use client';

import { useCart } from '@/hooks/useCart';
import type { IProduct } from '@/models/Product';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AddToCartButton({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to cart
    </Button>
  );
}
