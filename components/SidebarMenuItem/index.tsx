import styles from './styles.module.css'
import BagIcon from './bag-icon.svg'
import FavoritesIcon from './favorites-icon.svg'
import MyOrdersIcon from './my-orders-icon.svg'
import MenuIcon from './menu-icon.svg'
import LogoutIcon from './logout.svg'
import ConfigIcon from './config-icon.svg'

type SidebarMenuItemProps = {
  color: string
  label: string
  icon: 'bag' | 'favorites' | 'my-orders' | 'menu' | 'config' | 'logout'
  onClick: () => void
  disabled?: boolean
}

export const SidebarMenuItem = ({color, label, icon, onClick, disabled}: SidebarMenuItemProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {icon === 'bag' && <BagIcon color={color} />}
      {icon === 'menu' && <MenuIcon color={color} />} 
      {icon === 'favorites' && <FavoritesIcon color={color} />}
      {icon === 'my-orders' && <MyOrdersIcon color={color} />}           
      {icon === 'config' && <ConfigIcon color={color} /> }
      {icon === 'logout' && <LogoutIcon color={color} />}
      <span className={disabled ? styles.disabled : ''}>{label}</span>
    </div>
  )
}