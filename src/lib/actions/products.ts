'use server';

import dbConnect from '@/lib/db';
import Product, { IProduct } from '@/models/Product';
import Category, { ICategory } from '@/models/Category';

export async function getProducts(options: { category?: string, search?: string } = {}): Promise<IProduct[]> {
  await dbConnect();

  const filter: any = {};

  if (options.category) {
    const category = await Category.findOne({ slug: options.category });
    if (category) {
      filter.category = category._id;
    }
  }

  if (options.search) {
    filter.title = { $regex: options.search, $options: 'i' };
  }

  const products = await Product.find(filter).populate<{ category: ICategory }>('category').sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await dbConnect();
  const product = await Product.findOne({ slug }).populate<{ category: ICategory }>('category').lean();
  return JSON.parse(JSON.stringify(product));
}

export async function getCategories(): Promise<ICategory[]> {
  await dbConnect();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}
