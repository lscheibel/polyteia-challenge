import React from 'react';
import ErrorBoundary from './ErrorBoundary.tsx';
import styles from './GenericErrorBoundary.module.scss';

export interface GenericErrorBoundaryProps {
  children: React.ReactNode;
}

const GenericErrorBoundary = ({ children }: GenericErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={({ reset }) => (
        <div className={styles.fallback}>
          <strong className={styles.title}>Oh no, something unexpected happened!</strong>
          <p>You can try again, or if the error persists, please contact our customer support.</p>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={reset}>
              Try Again
            </button>
            <button className={styles.button} onClick={() => alert('Todo :)')}>
              Contact Customer Support
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GenericErrorBoundary;
