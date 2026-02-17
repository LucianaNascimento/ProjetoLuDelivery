import { Product } from '@/types/Product'
import styles from './styles.module.css'
import Link from 'next/link'

type ProductItemProps = {
  data: Product
  mainColor: string
  secondColor: string
}

export const ProductItem = ({ data, mainColor, secondColor }: ProductItemProps) => {
  return (
    <Link style={{textDecoration: 'none' }} href={`/lucianaburger/product/${data.id}`}>
      <div className={styles.container}>
        <div className={styles.head} style={{ backgroundColor: secondColor }}></div>
        <div className={styles.info}> 
          <div className={styles.image}>
            <img src={data.image} alt="Burger" /></div>
          <div className={styles.categoryName}>{data.categoryName}</div>
          <div className={styles.productName}>{data.productName}</div>
          <div className={styles.price} style={{ color: mainColor }}>R$ {data.price}</div>
        </div>
      </div>
    </Link>

  )
}