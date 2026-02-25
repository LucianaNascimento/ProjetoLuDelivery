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
import { CartCookie } from '@/types/CartCookie';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const ProductPage = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const [qtCount, setQtCount] = useState(1)

  const formatter = useFormatter()
  const router = useRouter()

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount)
  }

  const handleAddToCart = () => {
    let cart: CartCookie[] = []

    if(hasCookie('cart')) {
      const cartCookie = getCookie('cart')
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string)

      for(let i in cartJson) {
        if(cartJson[i].quantity && cartJson[i].id) {
          cart.push(cartJson[i])
        }
      }
    }

    const cartIndex = cart.findIndex(item => item.id === data.product.id)

    if(cartIndex > -1) {
      cart[cartIndex].quantity += qtCount
    } else {
      cart.push({ id: data.product.id, quantity: qtCount})
    }

    setCookie('cart', JSON.stringify(cart))
    router.push(`/${data.tenant.slug}/cart`)
    
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

  const product = await api.getProduct(parseInt(id as string))

  return {

    props: {
      tenant,
      product
    }
  }
}