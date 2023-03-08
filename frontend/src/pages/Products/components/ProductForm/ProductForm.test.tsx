import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { GET_PRODUCTS, UPDATE_PRODUCT } from '../../../../services/services'
import { Product } from '../../models'
import ProductForm from './ProductForm'

const productMock: Product = {
  id: '1',
  name: 'Product 1',
  description: 'Description for Product 1',
  price: 10.0,
}

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: [productMock],
      },
    },
  },
]

describe('ProductForm', () => {
  it('should render a form with input fields and buttons', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductForm modalIsOpen={true} setModalIsOpen={() => ({})} />
      </MockedProvider>,
    )
    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')
    const priceInput = screen.getByTestId('price-input')
    const createButton = screen.getByText('Create')
    const cancelButton = screen.getByText('Cancel')

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(priceInput).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('should prefill the form if a product prop is passed', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductForm modalIsOpen={true} setModalIsOpen={() => ({})} product={productMock} />
      </MockedProvider>,
    )

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const descriptionInput = screen.getByTestId('description-input') as HTMLInputElement
    const priceInput = screen.getByTestId('price-input') as HTMLInputElement

    expect(nameInput.value).toBe(productMock.name)
    expect(descriptionInput.value).toBe(productMock.description)
    expect(priceInput.value).toBe(productMock.price.toString())
  })

  it('should submit the form and create a product', async () => {
    const setModalIsOpenMock = vi.fn()

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductForm modalIsOpen={true} setModalIsOpen={setModalIsOpenMock} />
      </MockedProvider>,
    )

    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')
    const priceInput = screen.getByTestId('price-input')
    const createButton = screen.getByText('Create')

    userEvent.type(nameInput, 'Product 1')
    userEvent.type(descriptionInput, 'Description for Product 1')
    userEvent.type(priceInput, '10')

    userEvent.click(createButton)
  })

  it('should submit the form and update a product', async () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      description: 'This is a test product',
      price: 10.99,
    }

    const updateMock = {
      request: {
        query: UPDATE_PRODUCT,
        variables: {
          id: product.id,
          input: {
            name: 'New Name',
            description: 'New Description',
            price: 15.99,
          },
        },
      },
      result: {
        data: {
          updateProduct: {
            id: product.id,
            name: 'New Name',
            description: 'New Description',
            price: 15.99,
          },
        },
      },
    }

    const { getByRole } = render(
      <MockedProvider mocks={[updateMock]} addTypename={false}>
        <ProductForm modalIsOpen={true} setModalIsOpen={() => ({})} product={product} />
      </MockedProvider>,
    )

    // Fill out form fields
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'New Name' } })
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'New Description' } })
    fireEvent.change(screen.getByTestId('price-input'), { target: { value: '15.99' } })

    // Submit form
    fireEvent.click(getByRole('button', { name: 'Update' }))

    // Wait for update mutation to be called
    await waitFor(() => {
      expect(updateMock.result?.data?.updateProduct?.name).toEqual('New Name')
      expect(updateMock.result?.data?.updateProduct?.description).toEqual('New Description')
      expect(updateMock.result?.data?.updateProduct?.price).toEqual(15.99)
    })
  })
})
