import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { User } from '../../models'
import styles from './UserCard.module.scss'

interface UserCardProps {
  user: User
  selectUser: (user: User) => void
  deleteUser: (user: User) => void
}

export default function UserCard({ user, selectUser, deleteUser }: UserCardProps) {
  return (
    <Card sx={{ maxWidth: 345, marginTop: '1rem', marginLeft: '1rem'  }}>
      <CardMedia className={styles.image} component='img' alt='User Image' height='140' image='./person.png' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {user.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => selectUser(user)}>
          Edit
        </Button>
        <Button size='small' onClick={() => deleteUser(user)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}
