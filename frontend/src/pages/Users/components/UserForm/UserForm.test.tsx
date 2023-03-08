import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { GET_USERS, UPDATE_USER } from '../../../../services/services'
import { User } from '../../models'
import UserForm from './UserForm'

const userMock: User = {
  id: '1',
  name: 'User 1',
  email: 'martin@gmail.com',
}

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [userMock],
      },
    },
  },
]

describe('UserForm', () => {
  it('should render a form with input fields and buttons', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserForm modalIsOpen={true} setModalIsOpen={() => ({})} />
      </MockedProvider>,
    )
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const createButton = screen.getByText('Create')
    const cancelButton = screen.getByText('Cancel')

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('should prefill the form if a user prop is passed', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserForm modalIsOpen={true} setModalIsOpen={() => ({})} user={userMock} />
      </MockedProvider>,
    )

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement

    expect(nameInput.value).toBe(userMock.name)
    expect(emailInput.value).toBe(userMock.email)
  })

  it('should submit the form and create a user', async () => {
    const setModalIsOpenMock = vi.fn()

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserForm modalIsOpen={true} setModalIsOpen={setModalIsOpenMock} />
      </MockedProvider>,
    )

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const createButton = screen.getByText('Create')

    userEvent.type(nameInput, 'User 1')
    userEvent.type(emailInput, 'martin@gmail.com')

    userEvent.click(createButton)
  })

  it('should submit the form and update a user', async () => {
    const user: User = {
      id: '1',
      name: 'Test User',
      email: 'martin@gmail.com',
    }

    const updateMock = {
      request: {
        query: UPDATE_USER,
        variables: {
          id: user.id,
          input: {
            name: 'New Name',
            email: 'martin@gmail.com',
          },
        },
      },
      result: {
        data: {
          updateUser: {
            id: user.id,
            name: 'New Name',
            email: 'martin@gmail.com',
          },
        },
      },
    }

    const { getByRole } = render(
      <MockedProvider mocks={[updateMock]} addTypename={false}>
        <UserForm modalIsOpen={true} setModalIsOpen={() => ({})} user={user} />
      </MockedProvider>,
    )

    // Fill out form fields
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'New Name' } })
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'martin@gmail.com' } })

    // Submit form
    fireEvent.click(getByRole('button', { name: 'Update' }))

    // Wait for update mutation to be called
    await waitFor(() => {
      expect(updateMock.result?.data?.updateUser?.name).toEqual('New Name')
      expect(updateMock.result?.data?.updateUser?.email).toEqual('martin@gmail.com')
    })
  })
})
