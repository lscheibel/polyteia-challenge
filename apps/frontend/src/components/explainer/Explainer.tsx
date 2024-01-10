import styles from './Explainer.module.scss';

const Explainer = () => {
  return (
    <small className={styles.text}>
      This is a sample app, developed as part of the interview process for{' '}
      <a href="https://www.polyteia.com/">Polyteia</a>.
    </small>
  );
};

export default Explainer;
