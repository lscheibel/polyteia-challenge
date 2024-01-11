import { localStorageAtom } from '../tools/localStorageAtom.ts';
import { useAtom } from 'react-atomic-state';
import { GraphTypes } from '../components/stock-graph/tools.ts';

export type StockGraphPreferences = { view: GraphTypes };

const stockGraphPreferencesAtom = localStorageAtom<StockGraphPreferences>('stockGraphPreferences', {
  view: GraphTypes.Line,
});

export const useStockGraphPreferences = () => useAtom(stockGraphPreferencesAtom);
export const setStockGraphPreferences = stockGraphPreferencesAtom.set;
