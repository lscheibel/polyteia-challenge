import { gql, useQuery } from '@apollo/client';

// Todo: Can this be generated from backend model?
export interface StockNamesQueryData {
  stocks: [
    {
      __typename: 'Stock';
      symbol: string;
      name: string;
    },
  ];
}

export const useStockNamesQuery = () => {
  const GET_STOCK_NAMES = gql`
    query StockNames {
      stocks {
        symbol
        name
      }
    }
  `;

  return useQuery<StockNamesQueryData>(GET_STOCK_NAMES);
};
