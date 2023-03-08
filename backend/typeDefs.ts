import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
  }

  type Query {
    users: [User!]!
    products: [Product!]!
    user(id: ID!): User
    product(id: ID!): Product
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createProduct(input: CreateProductInput!): Product
    updateUser(id: ID!, input: UpdateUserInput!): User
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteUser(id: ID!): User
    deleteProduct(id: ID!): Product
  }
`;

