import { useQuery } from '@apollo/client'
import { Button } from '@mui/material'
import { useState } from 'react'
import { Loader } from '../../components/Loader'
import { GET_USERS, useDeleteUser } from '../../services/services'
import { UserCard, UserForm } from './components'
import { User } from './models'
import styles from './Users.module.scss'

function Users() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const { loading, data } = useQuery(GET_USERS)
  const [deleteUser] = useDeleteUser()

  if (loading) {
    return <Loader />
  }

  const addNewUser = () => {
    setSelectedUser(undefined)
    setModalIsOpen(true)
  }

  const selectUser = (user: User) => {
    setSelectedUser(user)
    setModalIsOpen(true)
  }

  const handleDeleteUser = async (user: User) => {
    return await deleteUser({
      variables: {
        id: user?.id,
      },
      refetchQueries: [{ query: GET_USERS }],
    })
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Users</h2>
      <div className={styles.cardContainer}>
        {data.users.map((user: User, key: number) => (
          <UserCard key={key} user={user} selectUser={selectUser} deleteUser={handleDeleteUser} />
        ))}
      </div>
      <Button className={styles.button} variant='contained' onClick={() => addNewUser()}>
        Create User
      </Button>
      <UserForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} user={selectedUser} />
    </div>
  )
}

export default Users
