import styles from '../../../styles/Product-id.module.css'
import { useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/app';
import { Product } from '@/types/Product';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { useFormatter } from '@/libs/useFormatter';
import Quantity from '@/components/Quantity';
import { useState } from 'react';

const ProductPage = (data: Props) => {
  console.log("🚀 ~ ProductPage ~ data:", data)
  const { tenant, setTenant } = useAppContext()
  const [qtCount, setQtCount] = useState(1)

  const formatter = useFormatter()

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount)
  }

  const handleAddToCart = () => {
    console.log("Adicionar ao carrinho")
  }  

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.productName} | {data.tenant.name}</title>
      </Head>

      <div className={styles.headerArea}>
        <Header
          color={data.tenant?.mainColor || '#000'}
          backHref={`/${data.tenant?.slug}`}
          title="Produto"
          invert
        />
      </div>

      <div
        className={styles.headerBg}
        style={{ backgroundColor: data.tenant?.mainColor || '#333' }}>
      </div>

      <div className={styles.productImage}>
        <img src={data.product.image} alt={data.product.productName}></img>
      </div>

      <div className={styles.productCategory}>{data.product.categoryName}</div>
      <div
        className={styles.productName}
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        {data.product.productName}
      </div>
      <div className={styles.line}></div>

      <div className={styles.productDescription}>{data.product.description}</div>

      <div className={styles.qtText}>Quantidade</div>
      <div className={styles.qtAndPriceArea}>
        <div className={styles.productQuantity}>
          <Quantity 
            color={data.tenant?.mainColor || '#fff'}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
            max={10}
            />
        </div>
        <div
          className={styles.productPrice}
          style={{ color: data.tenant?.mainColor || '#000' }}
        >
          {formatter.formatPrice(data.product.price)}
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={data.tenant?.mainColor || '#000'}
          label='Adicionar a sacola'
          onclick={handleAddToCart}
          fill />
      </div>

    </div>
  )
}

export default ProductPage;

type Props = {
  tenant: Tenant
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query
  const api = useApi(tenantSlug as string)
  const tenant = await api.getTenant()

  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const product = await api.getProduct(id as string)

  return {

    props: {
      tenant,
      product
    }
  }
}