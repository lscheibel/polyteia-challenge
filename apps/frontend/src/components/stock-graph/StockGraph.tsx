import { useMemo } from 'react';
import { StockDetailsQueryData } from '../../apollo/queries/stockDetailsQuery.ts';
import StockLineGraph from './StockLineGraph.tsx';
import StockCandleGraph from './StockCandleGraph.tsx';
import { useStockGraphPreferences } from '../../state/stockGraphPreferences.ts';

export interface StockGraphProps {
  data: StockDetailsQueryData;
}

const StockGraph = ({ data }: StockGraphProps) => {
  const { view } = useStockGraphPreferences();

  // Note: A different approach would be to have only one graph with multiple layers, which would be swapped out.

  const lineChart = useMemo(() => <StockLineGraph data={data} />, [data]);
  const candleChart = useMemo(() => <StockCandleGraph data={data} />, [data]);

  if (view === 'candle') return candleChart;
  return lineChart;
};

export default StockGraph;
