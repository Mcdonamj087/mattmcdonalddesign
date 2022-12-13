import {forwardRef} from 'react';
import * as styles from './styles.module.css';

const Mouse = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles.mouseDot} ref={ref}>
      <span className={styles.dot} />
      <span className={styles.ring} />
    </div>
  );
});

export default Mouse;
