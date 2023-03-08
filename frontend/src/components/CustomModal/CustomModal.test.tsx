import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'
import CustomModal from './CustomModal'

describe('CustomModal component', () => {
  it('should render the modal with children when isOpen is true', () => {
    const { getByText } = render(
      <CustomModal isOpen={true}>
        <p>Modal content</p>
      </CustomModal>,
    )

    expect(getByText('Modal content')).toBeInTheDocument()
  })

  it('should not render the modal when isOpen is false', () => {
    const { queryByText } = render(
      <CustomModal isOpen={false}>
        <p>Modal content</p>
      </CustomModal>,
    )

    expect(queryByText('Modal content')).not.toBeInTheDocument()
  })
})
