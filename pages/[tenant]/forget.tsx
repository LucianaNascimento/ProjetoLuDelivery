import styles from '../../styles/Forget.module.css'
import { useApi } from '@/libs/useApi';
import { GetServerSideProps } from 'next';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import Link from 'next/link';
import router from 'next/router';

const Forget = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleSubmit = () => {
  }

  const handleSignup = () => {
    router.push(`/${tenant?.slug}/signup`)
  }


  return (
    <div className={styles.container}>

      <Head>
        <title>Esqueci a senha | {tenant?.name}</title>
      </Head>

      <Header color={tenant?.mainColor || '#000'} backHref={`/${tenant?.slug}/login`} />

      <div className={styles.header}>{tenant?.name}</div>

      <div className={styles.title}>Esqueceu sua senha?</div>

      <div className={styles.subtitle}>
        Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.
      </div>
      <div className={styles.line}></div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={tenant?.mainColor || '#000'}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>
 
        <div className={styles.inputArea}>
          <Button
            color={tenant?.mainColor}
            label="Enviar"
            onclick={handleSubmit}
            fill
          />
        </div>
      </div>

      {/* <Button
        color={tenant?.mainColor}
        label="Entrar"
        onclick={handleSubmit}
      /> */}     

    </div>
  )
}

export default Forget;

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query
  const api = useApi()
  const tenant = await api.getTenant(tenantSlug as string)

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