import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', (): void => {
  it('renders the Loader component with the correct CSS classes', (): void => {
    const { container }: RenderResult = render(<Loader />)
    const loaderContainer: Element | null = container.firstChild
    expect(loaderContainer).toHaveClass('_loaderContainer_d51639')

    const loaderLoader: Element | null = loaderContainer?.firstChild
    expect(loaderLoader).toHaveClass('_loaderLoader_d51639')

    const loaderTop: Element | null = loaderLoader?.firstChild
    expect(loaderTop).toHaveClass('_loaderTop_d51639')

    const loaderBottom: Element | null = loaderLoader?.children[1]
    expect(loaderBottom).toHaveClass('_loaderBottom_d51639')

    const loaderCenter: Element | null = loaderLoader?.children[2]
    expect(loaderCenter).toHaveClass('_loaderCenter_d51639')
  })
})
