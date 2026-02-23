import { useAuthContext } from '@/contexts/auth'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Tenant } from '@/types/Tenant'
import { SidebarMenuItem } from '../SidebarMenuItem'

type SidebarProps = {
  tenant: Tenant
  open: boolean
  onClose: () => void
}

export const Sidebar = ({ tenant, open, onClose }: SidebarProps) => {
  const { user } = useAuthContext()

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
                onclick={() => { }}
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
          <SidebarMenuItem color={tenant?.mainColor} label="Cardápio" icon="menu" onClick={() => { }} />
          <SidebarMenuItem color={tenant?.mainColor} label="Sacola" icon="bag" onClick={() => { }} />
          <SidebarMenuItem color={tenant?.mainColor} label="Favoritos" icon="favorites" onClick={() => { }} />
          <SidebarMenuItem color={tenant?.mainColor} label="Meus Pedidos" icon="my-orders" onClick={() => { }} />
          <SidebarMenuItem color={tenant?.mainColor} label="Configurações" icon="config" onClick={() => { }} />



          <SidebarMenuItem color={tenant?.mainColor} label="Sair" icon="logout" onClick={() => { }} />


        </div>
      </div>

    </div>
  )
}