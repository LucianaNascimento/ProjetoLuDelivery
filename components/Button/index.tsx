import styles from './styles.module.css'

type ButtonProps = {
  color?: string;
  label: string;
  onclick: () => void;
  fill?: boolean;
}

export const Button = ({ color, label, onclick, fill }: ButtonProps) => {
  return (
    <div 
      className={styles.container}
      onClick={onclick}
      style={{
        color: fill ? '#fff' : color,
        borderColor: color,
        backgroundColor: fill ? color : 'transparent'
      }}
    > {label}</div>
  )
}