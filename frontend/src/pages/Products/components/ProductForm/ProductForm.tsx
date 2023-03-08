import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomModal } from '../../../../components'
import { GET_PRODUCTS, useCreateProduct, useUpdateProduct } from '../../../../services/services'
import { Product } from '../../models'
import styles from './ProductForm.module.scss'

interface Props {
  modalIsOpen: boolean
  setModalIsOpen: (value: boolean) => void
  product?: Product
}

export default function ProductForm({ modalIsOpen, setModalIsOpen, product }: Props) {
  const defaultValues = product
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: defaultValues,
  })
  const [createProduct] = useCreateProduct()
  const [updateProduct] = useUpdateProduct()
  const onSubmit: SubmitHandler<Product> = (data) => tryCreateProduct(data)

  const tryCreateProduct = (data: Product) => {
    product?.id ? handleUpdateProduct(data) : handleCreateProduct(data)
    reset()
    setModalIsOpen(false)
  }

  const handleCreateProduct = async (Product: Product) => {
    return await createProduct({
      variables: {
        input: {
          name: Product.name,
          description: Product.description,
          price: Number(Product.price),
        },
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }

  const handleUpdateProduct = async (Product: Product) => {
    return await updateProduct({
      variables: {
        id: product?.id,
        input: {
          name: Product.name,
          description: Product.description,
          price: Number(Product.price),
        },
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <>
      <CustomModal isOpen={modalIsOpen}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <label htmlFor='name'>Name:</label>
            <input type='text' data-testid='name-input' {...register('name', { required: true })} defaultValue={defaultValues?.name} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='description'>Description:</label>
            <textarea
              data-testid='description-input'
              {...register('description', { required: true })}
              defaultValue={defaultValues?.description}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='price'>Price:</label>
            <input
              data-testid='price-input'
              type='number'
              step='0.01'
              {...register('price', { required: true })}
              defaultValue={defaultValues?.price}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant='contained' type='submit'>
              {product?.id ? 'Update' : 'Create'}
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
