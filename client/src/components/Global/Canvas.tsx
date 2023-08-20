import { ForwardedRef, forwardRef } from 'react';
import styles from './stylesheets/Canvas.module.css';

const Canvas = forwardRef(
  (_props: unknown, ref: ForwardedRef<HTMLCanvasElement>) => {
    return (
      <canvas
        ref={ref}
        className={styles.canvas}
        width="720"
        height="960"
      ></canvas>
    );
  }
);

export default Canvas;
