import React, { CSSProperties } from 'react'
import styles from './CustomButton.module.scss'

interface CustomButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  style?: CSSProperties
  className?: string
}

export default function CustomButton({ children, onClick, style, className }: CustomButtonProps) {
  return (
    <button className={`${styles.CustomButton} ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  )
}
