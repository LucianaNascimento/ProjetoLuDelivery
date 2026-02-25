import { SearchInput } from '@/components/SearchInput';
import styles from '../../styles/Home.module.css'
import { Banner } from '@/components/Banner';
import { ProductItem } from '@/components/ProductItem';
import { useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/app';
import { useAuthContext } from '@/contexts/auth';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import { Sidebar } from '@/components/Sidebar';
import { getCookie } from 'cookies-next';
import { User } from '@/types/User';
import NoItemsIcon from '../../public/assets/no-items.svg'

const Home = (data: Props) => {
  const [products, setProducts] = useState<Product[]>(data.products)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const { tenant, setTenant } = useAppContext()
  const { setToken, setUser } = useAuthContext()


  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if (data.user) setUser(data.user)

  }, [])


  useEffect(() => {
    let newFilteredProducts: Product[] = []
    for (let product of data.products) {
      if (product.productName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product)
      }
    }
    setFilteredProducts(newFilteredProducts)
  }, [searchText])


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
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
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

      {searchText &&
        <>
          <div className={styles.searchText}>
            Procurando por: <strong>{searchText}</strong>
          </div>

          {filteredProducts.length > 0 &&

            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}

            </div>
          }

          {filteredProducts.length === 0 &&
            <div className={styles.noProducts}>
              <NoItemsIcon color="#e0e0e0"/>
              <div className={styles.noProductsText}>
                Ops! Não há itens com este nome
              </div>
            </div>
          }

        </>
      }

      {!searchText &&
        <>
          <Banner />

          <div className={styles.grid}>
            {products.map((item, index) => (
              <ProductItem key={index} data={item} />
            ))}

          </div>
        </>
      }


    </div>
  )
}

export default Home;

type Props = {
  tenant: Tenant
  products: Product[]
  token: string
  user: User | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
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

  // const token = context.req.cookies?.token

  // 1. Pega o cookie
  const rawToken = await getCookie('token', context)

  // 2. Garante que seja string ou null (nunca undefined)
  const token = rawToken ? rawToken.toString() : null

  // 3. Autoriza (passando null ou string)
  const user = await api.authorizeToken(token as string)


  const products = await api.getAllProducts()

  return {

    props: {
      tenant,
      products,
      user: user ? user : null,
      token
    }
  }
}