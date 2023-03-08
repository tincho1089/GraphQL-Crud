import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
}

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = mongoose.model<UserDocument>('User', UserSchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
