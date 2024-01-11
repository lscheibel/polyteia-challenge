import { useMemo } from 'react';
import { StockDetailsQueryData } from '../../apollo/queries/stockDetailsQuery.ts';
import StockLineGraph from './StockLineGraph.tsx';
import StockCandleGraph from './StockCandleGraph.tsx';
import StockLineBreakGraph from './StockLineBreakGraph.tsx';
import { useStockGraphPreferences } from '../../state/stockGraphPreferences.ts';
import { GraphTypes } from './tools.ts';

export interface StockGraphProps {
  data: StockDetailsQueryData;
}

const StockGraph = ({ data }: StockGraphProps) => {
  const { view } = useStockGraphPreferences();

  const lineChart = useMemo(() => <StockLineGraph data={data} />, [data]);
  const candleChart = useMemo(() => <StockCandleGraph data={data} />, [data]);
  const lineBreakChart = useMemo(() => <StockLineBreakGraph data={data} />, [data]);

  if (view === GraphTypes.Candle) return candleChart;
  if (view === GraphTypes.LineBreak) return lineBreakChart;
  return lineChart;
};

export default StockGraph;
