import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'
import { describe, expect, vi } from 'vitest'
import { GET_PRODUCTS } from '../../services/services'
import { Product } from './models'
import Products from './Products'

expect.extend(toHaveNoViolations)

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'John Doe',
    description: 'description of John Doe',
    price: 100,
  },
  {
    id: '2',
    name: 'Jane Doe',
    description: 'description of Jane Doe',
    price: 200,
  },
]

const mockDeleteProduct = vi.fn()

const mockHandlers = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: mockProducts,
      },
    },
  },
]

vi.mock('../../services/services', async () => {
  const actual = await vi.importActual('../../services/services')
  return {
    ...actual,
    useDeleteProduct: () => [mockDeleteProduct],
  }
})

describe('Products', () => {
  it('renders without errors', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Products />
        </MockedProvider>,
      )
    })

    expect(await screen.findByText('Products')).toBeInTheDocument()
  })

  it('shows a list of products', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Products />
        </MockedProvider>,
      )
    })

    await screen.findByText(mockProducts[0].name)
    await screen.findByText(mockProducts[1].name)
  })

  it('opens the user form when the "Add Product" button is clicked', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Products />
        </MockedProvider>,
      )
    })

    const addProductButton = await screen.findByText('Create Product')
    fireEvent.click(addProductButton)

    await waitFor(() => {
      expect(screen.getByText('Create Product')).toBeInTheDocument()
    })
  })

  it('deletes a user when the "Delete" button is clicked', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Products />
        </MockedProvider>,
      )
    })

    await waitFor(async () => {
      const deleteProductButton = await screen.queryAllByText('Delete')
      fireEvent.click(deleteProductButton[0])
      expect(mockDeleteProduct).toHaveBeenCalled()
    })
  })
})
