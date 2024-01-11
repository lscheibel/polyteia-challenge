import { isSameDay } from 'date-fns/isSameDay';
import { StockDetailsQueryData } from '../../apollo/queries/stockDetailsQuery.ts';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { dateFormatter, DOWN_COLOR, UP_COLOR } from './tools.ts';
import { Theme } from '@nivo/core';

export interface StockLineBreakGraphProps {
  data: StockDetailsQueryData;
}

const StockLineBreakGraph = ({ data }: StockLineBreakGraphProps) => {
  const boxPlotData: Array<{ value: number; timestamp: number; color: string }> = [];

  data.stock.data.forEach((entry, index, allEntries) => {
    const previousEntry = allEntries[index - 1];
    if (!previousEntry) return;

    const color = previousEntry.value > entry.value ? DOWN_COLOR : UP_COLOR;

    // Note: This is a bit of a hack. A more sophisticated solution would actually define a time range in which the data should be aggregated.

    boxPlotData.push({
      value: previousEntry.value,
      timestamp: previousEntry.timestamp,
      color,
    });
    boxPlotData.push({
      value: entry.value,
      timestamp: previousEntry.timestamp,
      color,
    });
  });

  return (
    <ResponsiveBoxPlot
      data={boxPlotData}
      groupBy={'timestamp'}
      indexScale={{ type: 'band', round: false }}
      quantiles={[0, 0, 0.5, 1, 1]}
      padding={0}
      innerPadding={0}
      medianWidth={0}
      margin={{ top: 5, right: 0, bottom: 50, left: 40 }}
      theme={{ axis: { ticks: { line: { stroke: '#ddd' } } } } as Theme & { translation: any }}
      colors={data => {
        // Each group consists of exactly two data points so this works.
        return boxPlotData[data.groupIndex * 2].color;
      }}
      minValue={0}
      enableGridX={false}
      enableGridY={true}
      axisBottom={{
        tickValues: data.stock.data
          .map(v => v.timestamp)
          .filter((value, index, all) => {
            if (index === 0) return false;
            const previous = all[index - 1];
            return !isSameDay(new Date(previous * 1000), new Date(value * 1000));
          }),
        format: value => dateFormatter.format(new Date(value * 1000)),
      }}
      axisLeft={{
        tickSize: 0,
        format: value => `$${value}`,
      }}
      whiskerEndSize={0}
      isInteractive={false}
      animate={false}
    />
  );
};

export default StockLineBreakGraph;
