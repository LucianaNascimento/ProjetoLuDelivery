import styles from '../../styles/Login.module.css'
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

const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  const handleSubmit = () => {
  }

  const handleSignup = () => {
  }


  return (
    <div className={styles.container}>

      <Head>
        <title>Login | {tenant?.name}</title>
      </Head>

      <Header color={tenant?.mainColor || '#000'} backHref={`/${tenant?.slug}`} />

      <div className={styles.header}>{tenant?.name}</div>

      <div className={styles.subtitle}>Use suas credenciais para realizar o login. </div>
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
          <InputField
            color={tenant?.mainColor || '#000'}
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            password={true}
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={tenant?.mainColor}
            label="Entrar"
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

      <div className={styles.forgetArea}>
        Esqueceu sua senha? 
        <Link 
          href={`/${tenant?.slug}/forget`}
          style={{textDecoration: 'none'}}>
          <div> Clique aqui</div>
        </Link>
      </div>
      <div className={styles.line}></div>

      <div className={styles.signupArea}>
        <Button
          color={tenant?.mainColor}
          label="Quero me cadastrar"
          onclick={handleSignup}
        />

      </div>

    </div>
  )
}

export default Login;

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