import { useAuthContext } from '@/contexts/auth'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Tenant } from '@/types/Tenant'
import { SidebarMenuItem } from '../SidebarMenuItem'
import { use } from 'react'
import { useRouter } from 'next/router'

type SidebarProps = {
  tenant: Tenant
  open: boolean
  onClose: () => void
}

export const Sidebar = ({ tenant, open, onClose }: SidebarProps) => {
  const { user, setToken } = useAuthContext()

  const router = useRouter()

  return (
    <div className={styles.container}
      style={{ width: open ? '100vw' : '0' }}>
      <div className={styles.sidebarContent}>
        <div className={styles.header}>
          <div className={styles.loginArea}
            style={{ borderBottomColor: tenant?.mainColor }}>
            {user &&
              <div className={styles.userInfo}>
                <strong>{user.name}</strong>
                Último pedido há x semanas
              </div>
            }
            {!user &&
              <Button
                color={tenant?.mainColor}
                label="Fazer Login"
                onclick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            }

          </div>
          <div className={styles.closeBtn}
            style={{ color: tenant?.mainColor }}
            onClick={onClose}>x</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.menu}>
          <SidebarMenuItem color="#6a7d8b" label="Cardápio" icon="menu" onClick={onClose} />
          <SidebarMenuItem color="#6a7d8b" label="Sacola" icon="bag" onClick={() => router.push(`/${tenant.slug}/cart`)} />
          <SidebarMenuItem disabled color="#6a7d8b" label="Favoritos" icon="favorites" onClick={() => { }} />
          <SidebarMenuItem color="#6a7d8b" label="Meus Pedidos" icon="my-orders" onClick={() => router.push(`/${tenant.slug}/orders`)} />
          <SidebarMenuItem disabled color="#6a7d8b" label="Configurações" icon="config" onClick={() => { }} />          
        </div>
        <div className={styles.menuButton}>
          {user &&
            <SidebarMenuItem color="#6a7d8b" label="Sair" icon="logout" onClick={() => { 
              setToken('')
              onClose()
            }} />
          }          
        </div>
      </div>

    </div>
  )
}