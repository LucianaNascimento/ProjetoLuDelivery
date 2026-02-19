import { Product } from '@/types/Product'
import styles from './styles.module.css'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'
import { useFormatter } from '@/libs/useFormatter'

type ProductItemProps = {
  data: Product
}

export const ProductItem = ({ data }: ProductItemProps) => {
 const {tenant } = useAppContext()

 const formatter = useFormatter()

  return (
    <Link style={{textDecoration: 'none' }} href={`/${tenant?.slug}/product/${data.id}`}>
      <div className={styles.container}>
        <div className={styles.head} style={{ backgroundColor: tenant?.secondColor }}></div>
        <div className={styles.info}> 
          <div className={styles.image}>
            <img src={data.image} alt="Burger" /></div>
          <div className={styles.categoryName}>{data.categoryName}</div>
          <div className={styles.productName}>{data.productName}</div>
          <div className={styles.price} style={{ color: tenant?.mainColor }}>{formatter.formatPrice(data.price)}</div>
        </div>
      </div>
    </Link>

  )
}