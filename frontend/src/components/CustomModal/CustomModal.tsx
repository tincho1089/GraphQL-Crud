import { FC, ReactNode } from 'react'
import styles from './CustomModal.module.scss'

type CustomModalProps = {
  isOpen: boolean
  children: ReactNode
}

const CustomModal: FC<CustomModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}

export default CustomModal
