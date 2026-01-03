import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
  stock: number;
  slug: string;
}

const ProductSchema: Schema<IProduct> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  slug: { type: String, required: true, unique: true, index: true },
}, {
  timestamps: true,
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
