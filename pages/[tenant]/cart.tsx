import styles from '../../styles/Cart.module.css'
import { useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/app';
import { useAuthContext } from '@/contexts/auth';
import { useEffect } from 'react';
import { Product } from '@/types/Product';
import { getCookie } from 'cookies-next';
import { User } from '@/types/User';
import Head from 'next/head';
import { Header } from '@/components/Header';

const Cart = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const { setToken, setUser } = useAuthContext()

  useEffect(() => {
    setTenant(data.tenant)
    setToken(data.token)
    if (data.user) setUser(data.user)

  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Sacola"
      ></Header>

      <div className={styles.productQuantity}>x itens</div>

      <div className={styles.productsList}>
        
      </div>
    </div>
  )
}

export default Cart;

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