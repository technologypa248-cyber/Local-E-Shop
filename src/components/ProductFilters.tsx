'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ICategory } from '@/models/Category';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  categories: ICategory[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      current.delete('category');
    } else {
      current.set('category', value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = event.target.value;
    if (value) {
      current.set('search', value);
    } else {
      current.delete('search');
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10"
          onChange={handleSearchChange}
          defaultValue={searchParams.get('search') || ''}
        />
      </div>
      <Select onValueChange={handleCategoryChange} defaultValue={searchParams.get('category') || 'all'}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map(category => (
            <SelectItem key={category._id.toString()} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
