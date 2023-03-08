import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import UserCard from './UserCard'

describe('UserCard component', () => {
  const user = {
    id: 1,
    name: 'Test user',
    email: 'This is a test user',
  }
  const selectUser = vi.fn()
  const deleteUser = vi.fn()

  beforeEach(() => {
    render(<UserCard user={user} selectUser={selectUser} deleteUser={deleteUser} />)
  })

  it('renders the user information', () => {
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.email)).toBeInTheDocument()
  })

  it('calls selectUser when Edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'))
    expect(selectUser).toHaveBeenCalledWith(user)
  })

  it('calls deleteUser when Remove button is clicked', () => {
    fireEvent.click(screen.getByText('Remove'))
    expect(deleteUser).toHaveBeenCalledWith(user)
  })
})
