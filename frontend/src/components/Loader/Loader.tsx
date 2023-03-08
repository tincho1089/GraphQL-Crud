import React, { FC } from 'react'
import styles from './Loader.module.scss'

const Loader: FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loaderLoader}>
      <div className={styles.loaderTop} />
      <div className={styles.loaderBottom} />
      <div className={styles.loaderCenter} />
    </div>
  </div>
)

export default Loader
