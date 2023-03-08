import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ProductCard from './ProductCard'

describe('ProductCard component', () => {
  const product = {
    id: 1,
    name: 'Test product',
    description: 'This is a test product',
    price: '$19.99',
  }
  const selectProduct = vi.fn()
  const deleteProduct = vi.fn()

  beforeEach(() => {
    render(<ProductCard product={product} selectProduct={selectProduct} deleteProduct={deleteProduct} />)
  })

  it('renders the product information', () => {
    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText(product.price)).toBeInTheDocument()
  })

  it('calls selectProduct when Edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'))
    expect(selectProduct).toHaveBeenCalledWith(product)
  })

  it('calls deleteProduct when Delete button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'))
    expect(deleteProduct).toHaveBeenCalledWith(product)
  })
})
