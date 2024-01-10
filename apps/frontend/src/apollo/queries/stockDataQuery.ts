import { gql, useQuery } from '@apollo/client';

// Todo: Can this be generated from backend model?
export interface StockDataQueryData {
  stock: {
    symbol: string;
    data: Array<{ value: number; timestamp: number }>;
  };
}

export const useStockDataQuery = (stockSymbol: string) => {
  const GET_STOCK_DATA = gql`
    query StockDetails($symbol: String!) {
      stock(symbol: $symbol) {
        symbol
        data {
          value
          timestamp
        }
      }
    }
  `;

  return useQuery<StockDataQueryData>(GET_STOCK_DATA, { variables: { symbol: stockSymbol } });
};
