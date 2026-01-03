'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';

export function CartIcon() {
  const { cartCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {isMounted && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
        <span className="sr-only">Shopping Cart</span>
      </Link>
    </Button>
  );
}
