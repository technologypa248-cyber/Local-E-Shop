import Link from 'next/link';
import { Package2 } from 'lucide-react';
import { CartIcon } from './CartIcon';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              E-SHOP
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link
              href="/"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/#categories"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
