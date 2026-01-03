'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: 'Checkout Not Implemented',
      description: 'This is a feature for the future. For now, enjoy browsing!',
      duration: 5000,
    });
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center border-2 border-dashed border-border rounded-lg py-24">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item._id} className="flex items-center p-4">
                <Image
                  src={item.images[0] || "https://picsum.photos/seed/placeholder/200/200"}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover aspect-square"
                />
                <div className="flex-grow ml-4">
                  <Link href={`/product/${item.slug}`} className="font-semibold hover:text-primary">{item.title}</Link>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="w-20"
                  />
                   <Button variant="ghost" size="icon" onClick={() => removeFromCart(item._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" onClick={handleCheckout}>Proceed to Checkout (Future)</Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
