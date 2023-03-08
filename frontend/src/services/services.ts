import { gql, useQuery, useMutation } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

export function useUpdateProduct() {
  return useMutation(UPDATE_PRODUCT)
}

export function useDeleteProduct() {
  return useMutation(DELETE_PRODUCT)
}

export function useUpdateUser() {
  return useMutation(UPDATE_USER)
}

export function useDeleteUser() {
  return useMutation(DELETE_USER)
}

export function useGetUsers() {
  return useQuery(GET_USERS)
}

export function useGetProducts() {
  return useQuery(GET_PRODUCTS)
}

export function useCreateUser() {
  return useMutation(CREATE_USER)
}

export function useCreateProduct() {
  return useMutation(CREATE_PRODUCT)
}
