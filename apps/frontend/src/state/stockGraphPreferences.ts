import { localStorageAtom } from '../tools/localStorageAtom.ts';
import { useAtom } from 'react-atomic-state';

export type StockGraphPreferences = { view: 'line' | 'candle' };

const stockGraphPreferencesAtom = localStorageAtom<StockGraphPreferences>('stockGraphPreferences', {
  view: 'line',
});

export const useStockGraphPreferences = () => useAtom(stockGraphPreferencesAtom);
export const setStockGraphPreferences = stockGraphPreferencesAtom.set;
