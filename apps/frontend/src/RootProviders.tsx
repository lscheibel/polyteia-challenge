import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client.ts';

export interface RootProvidersProps {
  children: React.ReactNode;
}

const RootProviders = ({ children }: RootProvidersProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default RootProviders;
