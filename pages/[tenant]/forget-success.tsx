import styles from '../../styles/ForgetSuccess.module.css'
import { useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import router from 'next/router';
import { Icon } from '@/components/icons';

const ForgetSuccess = (data: Props) => {
  const { tenant, setTenant } = useAppContext()

  useEffect(() => {
    setTenant(data.tenant)
    console.log(tenant)
  }, [])

  const handleSubmit = () => {
    router.push(`/${tenant?.slug}/forget-success`)
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Verifique email | {tenant?.name}</title>
      </Head>

      <Header color={tenant?.mainColor || '#000'} backHref={`/${tenant?.slug}/login`} />

      <div className={styles.iconArea}>
        <Icon icon="mailSend" color={tenant?.mainColor || '#000'} width={99} height={81} />
      </div>

      <div className={styles.title}>Verifique seu e-mail</div>

      <div className={styles.subtitle}>
        Enviamos as instruções para recuperação de senha para o seu e-mail.
      </div>

      <div className={styles.formArea}>
 
        <div className={styles.inputArea}>
          <Button
            color={tenant?.mainColor}
            label="Fazer login"
            onclick={handleSubmit}
            fill
          />
        </div>
      </div>

    </div>
  )
}

export default ForgetSuccess;

type Props = {
  tenant: Tenant
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

  return {

    props: {
      tenant
    }
  }
}