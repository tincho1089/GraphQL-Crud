import { User, Product } from './models';

export const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    products: async () => {
      const products = await Product.find();
      return products;
    },
    user: async (_: any, { id }: any) => {
      const user = await User.findById(id);
      return user;
    },
    product: async (_: any, { id }: any) => {
      const product = await Product.findById(id);
      return product;
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: any) => {
      const user = await User.create(input);
      return user;
    },
    createProduct: async (_: any, { input }: any) => {
      const product = await Product.create(input);
      return product;
    },
    updateUser: async (_: any, { id, input }: any) => {
      const user = await User.findByIdAndUpdate(id, input, { new: true });
      return user;
    },
    updateProduct: async (_: any, { id, input }: any) => {
      const product = await Product.findByIdAndUpdate(id, input, { new: true });
      return product;
    },
    deleteUser: async (_: any, { id }: any) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
    deleteProduct: async (_: any, { id }: any) => {
      const product = await Product.findByIdAndDelete(id);
      return product;
    },
  },
};

