import styles from '../../../styles/Product-id.module.css'
import {  useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/AppContext';
import { Product } from '@/types/Product';
import Head from 'next/head';
import { Header } from '@/components/Header';

const ProductPage = (data: Props) => {
  console.log("🚀 ~ ProductPage ~ data:", data)
  const { tenant, setTenant } = useAppContext()

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
        />
      </div>

      <div 
        className={styles.headerBg}
        style={{backgroundColor: data.tenant?.mainColor || '#333'}}>        
      </div>

      <div className={styles.productImage}>
        <img src={data.product.image} alt={data.product.productName}></img>

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

  if(!tenant) {
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