import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Product } from '../../models'

interface ProductCardProps {
  product: Product
  selectProduct: (product: Product) => void
  deleteProduct: (product: Product) => void
}

export default function ProductCard({ product, selectProduct, deleteProduct }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345, marginTop: '1rem', marginLeft: '1rem' }}>
      <CardMedia component='img' alt='green iguana' height='140' image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {product.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => selectProduct(product)}>
          Edit
        </Button>
        <Button size='small' onClick={() => deleteProduct(product)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
