import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useFormatter } from '@/libs/useFormatter';

type QuantityProps = {
  color?: string;
  count: number;
  onUpdateCount: (newCount: number) => void;
  min?: number;
  max?: number;
  small?: boolean;
}

export default function Quantity({ color, count, onUpdateCount, min, max, small }: QuantityProps) {
  const [canRemove, setCanRemove] = useState(false);
  const [canAdd, setCanAdd] = useState(true);
  const formatter = useFormatter()

  useEffect(() => {
    if (count !== undefined) {
      setCanRemove((!min || (min && count > min)) ? true : false);
      setCanAdd((!max || (max && count < max)) ? true : false);
    }
  }, [count, min, max]);

  const handleMinus = () => {
    if (count !== undefined && canRemove) {
      onUpdateCount(count - 1);
    }
  };

  const handlePlus = () => {
    if (count !== undefined && canAdd) {
      onUpdateCount(count + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.button}
        onClick={handleMinus}
        style={{
          color: canRemove ? '#fff' : '#96a3ab',
          backgroundColor: canRemove ? color || '#000' : '#f2f4f5',
          cursor: canRemove ? 'pointer' : 'not-allowed',
          width: small ? 42 : 48,
          height: small ? 42 : 48,
        }}
      >
        -
      </div>
      <div
        style={{ fontSize: small ? 16 : 18 }}
        className={styles.qtyCount}
      >
        {formatter.formatQuantity(count, 1)}
      </div>
      <div
        className={styles.button}
        onClick={handlePlus}
        style={{
          color: canAdd ? '#fff' : '#96a3ab',
          backgroundColor: canAdd ? color : '#f2f4f5',
          cursor: canAdd ? 'pointer' : 'not-allowed',
          width: small ? 42 : 48,
          height: small ? 42 : 48,
        }}
      >
        +
      </div>
    </div>
  );

}