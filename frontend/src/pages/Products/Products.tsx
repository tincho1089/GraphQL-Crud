import { useQuery } from '@apollo/client'
import { Button } from '@mui/material'
import { useState } from 'react'
import { Loader } from '../../components/Loader'
import { GET_PRODUCTS, useDeleteProduct } from '../../services/services'
import { ProductForm } from './components'
import { ProductCard } from './components/ProductCard'
import { Product } from './models'
import styles from './Products.module.scss'

function Products() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const { loading, data } = useQuery(GET_PRODUCTS)
  const [deleteProduct] = useDeleteProduct()

  if (loading) {
    return <Loader />
  }

  const addNewProduct = () => {
    setSelectedProduct(undefined)
    setModalIsOpen(true)
  }

  const selectProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalIsOpen(true)
  }

  const handleDeleteProduct = async (product: Product) => {
    return await deleteProduct({
      variables: {
        id: product?.id,
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Products</h2>
      <div className={styles.cardContainer}>
        {data.products.map((product: Product, key: number) => (
          <ProductCard key={key} product={product} selectProduct={selectProduct} deleteProduct={handleDeleteProduct} />
        ))}
      </div>
      <Button className={styles.button} variant='contained' onClick={() => addNewProduct()}>
        Create Product
      </Button>
      <ProductForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} product={selectedProduct} />
    </div>
  )
}

export default Products
