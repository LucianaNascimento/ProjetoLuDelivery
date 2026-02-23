import { SearchInput } from '@/components/SearchInput';
import styles from '../../styles/Home.module.css'
import { Banner } from '@/components/Banner';
import { ProductItem } from '@/components/ProductItem';
import {  useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/app';
import { useAuthContext } from '@/contexts/auth';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import { Sidebar } from '@/components/Sidebar';

const Home = (data: Props) => {
  const [products, setProducts] = useState<Product[]>(data.products) 
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { tenant, setTenant } = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleSearch = (searchValue: string) => {
    console.log('Search value:', searchValue);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja bem vindo(a)</div>
            <div className={styles.headerSubtitle}>
              O que deseja para hoje?
            </div>
          </div>
          <div className={styles.headerTopRight}>
            <div className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
            </div>
            
            <Sidebar tenant={data.tenant} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput
            onSearch={handleSearch}
          />
        </div>
      </header>

      <Banner />

      <div className={styles.grid}>
        {products.map((item, index) => (
          <ProductItem key={index} data={item} />
        ))}
        
      </div>
    </div>
  )
}

export default Home;

type Props = {
  tenant: Tenant
  products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
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

  const products = await api.getAllProducts()

  return {

    props: {
      tenant,
      products
    }
  }
}