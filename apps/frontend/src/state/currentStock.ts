import { queryParamAtom } from '../tools/queryParamAtom.ts';
import { useAtom } from 'react-atomic-state';

const currentStockAtom = queryParamAtom('stock', null);

export const useCurrentStock = () => useAtom(currentStockAtom);
export const setCurrentStock = (stockSymbol: string | null) => currentStockAtom.set(stockSymbol);
