import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './normalize.scss';
import './index.scss';
import RootProviders from './RootProviders.tsx';
import GenericErrorBoundary from './components/error-boundary/GenericErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GenericErrorBoundary>
    <React.StrictMode>
      <RootProviders>
        <App />
      </RootProviders>
    </React.StrictMode>
  </GenericErrorBoundary>,
);
