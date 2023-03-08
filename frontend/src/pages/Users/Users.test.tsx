import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'
import { describe, expect, vi } from 'vitest'
import { GET_USERS } from '../../services/services'
import { User } from './models'
import Users from './Users'

expect.extend(toHaveNoViolations)

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
]

const mockDeleteUser = vi.fn()

const mockHandlers = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: mockUsers,
      },
    },
  },
]

vi.mock('../../services/services', async () => {
  const actual = await vi.importActual('../../services/services')
  return {
    ...actual,
    useDeleteUser: () => [mockDeleteUser],
  }
})

describe('Users', () => {
  it('renders without errors', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Users />
        </MockedProvider>,
      )
    })

    expect(await screen.findByText('Users')).toBeInTheDocument()
  })

  it('shows a list of users', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Users />
        </MockedProvider>,
      )
    })

    await screen.findByText(mockUsers[0].name)
    await screen.findByText(mockUsers[1].name)
  })

  it('opens the user form when the "Add User" button is clicked', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Users />
        </MockedProvider>,
      )
    })

    const addUserButton = await screen.findByText('Create User')
    fireEvent.click(addUserButton)

    await waitFor(() => {
      expect(screen.getByText('Create User')).toBeInTheDocument()
    })
  })

  it('deletes a user when the "Delete" button is clicked', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mockHandlers} addTypename={false}>
          <Users />
        </MockedProvider>,
      )
    })

    await waitFor(async () => {
      const deleteUserButton = await screen.queryAllByText('Remove')
      fireEvent.click(deleteUserButton[0])
      expect(mockDeleteUser).toHaveBeenCalled()
    })
  })
})
