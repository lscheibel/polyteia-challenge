import IconLoader from '../icons/Loader.tsx';
import styles from './LoadingOverlay.module.scss';

export interface LoadingOverlayProps {}

const LoadingOverlay = ({}: LoadingOverlayProps) => {
  return (
    <div className={styles.backdrop}>
      <IconLoader spin />
    </div>
  );
};

export default LoadingOverlay;
