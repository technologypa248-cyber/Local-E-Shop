'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '@/lib/constants';
import slugify from 'slugify';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    await dbConnect();

    // Check if seeding has already been done
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      // console.log('Database already seeded.');
      return;
    }

    console.log('Seeding database...');

    // Clear existing data (optional, for development)
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed Categories
    const createdCategories = await Category.insertMany(INITIAL_CATEGORIES);
    console.log(`${createdCategories.length} categories seeded.`);

    const categoryMap = new Map(createdCategories.map(c => [c.slug, c._id]));

    // Seed Products
    const productsToCreate = INITIAL_PRODUCTS.map(product => ({
      ...product,
      category: categoryMap.get(product.categorySlug),
      slug: slugify(product.title, { lower: true, strict: true }),
    }));

    await Product.insertMany(productsToCreate);
    console.log(`${productsToCreate.length} products seeded.`);

    // Seed a default admin user
    const adminEmail = 'admin@example.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default admin user created. Email: admin@example.com, Password: admin123');
    }
    
    console.log('Database seeding complete.');

  } catch (error) {
    console.error('Error seeding database:', error);
    // We don't want to throw an error here, as it might break the app on startup
    // if the database is not ready. The app should still be able to run.
  }
}
