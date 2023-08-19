import { useEffect } from 'react';
import styles from './First.module.css';
import useNavigateTo from '../hooks/useNavigateTo';

function First() {
  const navigateTo = useNavigateTo();

  const onClick = () => {
    navigateTo('/tutorial');
  };

  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  return (
    <div className={styles.decodiv} onClick={onClick}>
      <h1 className={styles.decoh}>클릭해 주세요!</h1>
    </div>
  );
}

export default First;
