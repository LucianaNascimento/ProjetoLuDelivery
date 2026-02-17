import { SearchInput } from '@/components/SearchInput';
import styles from '../../styles/Home.module.css'
import { Banner } from '@/components/Banner';
import { ProductItem } from '@/components/ProductItem';
import { getTenantResponse, useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';

const Home = (data: Props) => {
  const api = useApi();
  const tenant = api.getTenant('lucianaburger')
  if(!tenant) {
    return <div>Tenant não encontrado</div>
  }

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
            <div className={styles.menuButton}>
              <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
            </div>

          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput
            mainColor={data.tenant.mainColor}
            onSearch={handleSearch}
          />
        </div>
      </header>

      <Banner />

      <div className={styles.grid}>
        <ProductItem data={{id: 1, image: '../tmp/burger.png', categoryName: 'Tradicional', productName: 'Texas Burger', price: 'R$ 25.50'}} 
          mainColor={data.tenant.mainColor} secondColor={data.tenant.secondColor} />
        <ProductItem data={{id: 2, image: '../tmp/burger.png', categoryName: 'Tradicional', productName: 'Texas Burger', price: 'R$ 25.50'}} 
        mainColor={data.tenant.mainColor} secondColor={data.tenant.secondColor} />
        <ProductItem data={{id: 3, image: '../tmp/burger.png', categoryName: 'Tradicional', productName: 'Texas Burger', price: 'R$ 25.50'}} 
        mainColor={data.tenant.mainColor} secondColor={data.tenant.secondColor} />
        <ProductItem data={{id: 4, image: '../tmp/burger.png', categoryName: 'Tradicional', productName: 'Texas Burger', price: 'R$ 25.50'}} 
        mainColor={data.tenant.mainColor} secondColor={data.tenant.secondColor} />
        
      </div>
    </div>
  )
}

export default Home;

type Props = {
  tenant: getTenantResponse
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  const api = useApi()
  const tenant = await api.getTenant(tenantSlug as string)

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {

    props: {
      tenant
    }
  }
}