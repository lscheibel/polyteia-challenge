import { gql, useQuery } from '@apollo/client';

// Todo: Can this be generated from backend model?
export interface StockData {
  value: number;
  timestamp: number;
}

export interface StockDetailsQueryData {
  stock: {
    symbol: string;
    name?: string;
    description?: string;
    notTrustworthy?: boolean;
    data: StockData[];
  };
}

export const useStockDetailsQuery = (stockSymbol: string) => {
  const GET_STOCK_DETAILS = gql`
    query StockDetails($symbol: String!) {
      stock(symbol: $symbol) {
        symbol
        name
        description
        notTrustworthy
        data {
          value
          timestamp
        }
      }
    }
  `;

  return useQuery<StockDetailsQueryData>(GET_STOCK_DETAILS, { variables: { symbol: stockSymbol } });
};
