import styles from '../../styles/Signup.module.css'
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

const Signup = (data: Props) => {
  const { tenant, setTenant } = useAppContext()
  const [name, setName] = useState('')
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
        <title>Cadastro | {tenant?.name}</title>
      </Head>

      <Header color={tenant?.mainColor || '#000'} backHref={`/${tenant?.slug}/login`} />

      <div className={styles.header}>{tenant?.name}</div>

      <div className={styles.subtitle}>Preencha os campos para criar o seu cadastro.</div>
      <div className={styles.line}></div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={tenant?.mainColor || '#000'}
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
          />
        </div>
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
            label="Cadastrar"
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
        Já tem cadastro?
        <Link
          href={`/${tenant?.slug}/login`}
          style={{ textDecoration: 'none' }}>
          <div style={{color: tenant?.mainColor || '#000'}}>Faça login</div>
        </Link>
      </div>
    </div>
  )
}

export default Signup;

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