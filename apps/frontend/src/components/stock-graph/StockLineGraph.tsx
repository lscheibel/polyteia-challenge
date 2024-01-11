import { ResponsiveLine } from '@nivo/line';
import { isSameDay } from 'date-fns/isSameDay';
import { StockDetailsQueryData } from '../../apollo/queries/stockDetailsQuery.ts';
import { dateFormatter } from './tools.ts';

export interface StockLineGraphProps {
  data: StockDetailsQueryData;
}

const StockLineGraph = ({ data }: StockLineGraphProps) => {
  const lineChartData = [
    {
      id: data.stock.symbol,
      data: data.stock.data.map(entry => ({
        y: entry.value,
        x: new Date(entry.timestamp * 1000),
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={lineChartData}
      enableGridX={false}
      enableGridY={true}
      margin={{ top: 5, right: 0, bottom: 50, left: 40 }}
      theme={{ axis: { ticks: { line: { stroke: '#ddd' } } } }}
      colors={'#222'}
      lineWidth={3}
      enablePoints={false}
      axisBottom={{
        tickValues: lineChartData[0].data
          .map(v => v.x)
          .filter((value, index, all) => {
            if (index === 0) return false;
            const previous = all[index - 1];
            return !isSameDay(previous, value);
          }),
        format: value => dateFormatter.format(value),
      }}
      axisLeft={{
        tickSize: 0,
        format: value => `$${value}`,
      }}
      isInteractive={true}
      enableCrosshair={true}
      animate={false}
    />
  );
};

export default StockLineGraph;
