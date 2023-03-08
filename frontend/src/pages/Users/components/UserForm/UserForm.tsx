// UserForm.tsx
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomModal } from '../../../../components'
import { GET_USERS, useCreateUser, useUpdateUser } from '../../../../services/services'
import { User } from '../../models'
import styles from './UserForm.module.scss'

interface Props {
  modalIsOpen: boolean
  setModalIsOpen: (value: boolean) => void
  user?: User
}

export default function UserForm({ modalIsOpen, setModalIsOpen, user }: Props) {
  const defaultValues = user
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: defaultValues,
  })
  const [createUser] = useCreateUser()
  const [updateUser] = useUpdateUser()
  const onSubmit: SubmitHandler<User> = (data) => tryCreateUser(data)

  const tryCreateUser = (data: User) => {
    user?.id ? handleUpdateUser(data) : handleCreateUser(data)
    reset()
    setModalIsOpen(false)
  }

  const handleCreateUser = async (User: User) => {
    return await createUser({
      variables: {
        input: {
          name: User.name,
          email: User.email,
        },
      },
      refetchQueries: [{ query: GET_USERS }],
    })
  }

  const handleUpdateUser = async (User: User) => {
    return await updateUser({
      variables: {
        id: user?.id,
        input: {
          name: User.name,
          email: User.email,
        },
      },
      refetchQueries: [{ query: GET_USERS }],
    })
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <>
      <CustomModal isOpen={modalIsOpen}>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <label htmlFor='name'>Name:</label>
            <input type='text' data-testid='name-input' {...register('name', { required: true })} defaultValue={defaultValues?.name} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='email'>Email:</label>
            <textarea data-testid='email-input' {...register('email', { required: true })} defaultValue={defaultValues?.email} />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant='contained' type='submit'>
              {user?.id ? 'Update' : 'Create'}
            </Button>
            <Button variant='contained' type='button' onClick={() => setModalIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  )
}
