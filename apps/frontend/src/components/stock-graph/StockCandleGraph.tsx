import { isSameDay } from 'date-fns/isSameDay';
import { StockDetailsQueryData } from '../../apollo/queries/stockDetailsQuery.ts';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { dateFormatter, DOWN_COLOR, UP_COLOR } from './tools.ts';
import { Theme } from '@nivo/core';

export interface StockCandleGraphProps {
  data: StockDetailsQueryData;
}

const StockCandleGraph = ({ data }: StockCandleGraphProps) => {
  const TIME_RANGE = 60 * 60 * 4; // 4 hours, timestamp is in seconds.

  const boxPlotData = data.stock.data.map(entry => {
    const group = Math.ceil(entry.timestamp / TIME_RANGE);

    return {
      value: entry.value,
      timestamp: entry.timestamp,
      group: group.toString(),
    };
  });

  const xAxisTicks = boxPlotData.filter(({ timestamp }, index, all) => {
    if (index === 0) return false;
    const previous = all[index - 1].timestamp;
    return !isSameDay(new Date(previous * 1000), new Date(timestamp * 1000));
  });

  return (
    <ResponsiveBoxPlot
      data={boxPlotData}
      indexScale={{ type: 'band', round: false }}
      quantiles={[0, 0.25, 0.5, 0.75, 1]}
      padding={0}
      innerPadding={0}
      medianWidth={0}
      margin={{ top: 5, right: 0, bottom: 50, left: 40 }}
      theme={{ axis: { ticks: { line: { stroke: '#ddd' } } } } as Theme & { translation: any }}
      colors={({ group }) => {
        // Note: Unfortunately Nivo doesn't expose the stratified data.
        //  This makes the coloring process rather inefficient, but at least for ~200 items this is no big deal.
        const groupData = boxPlotData.filter(d => d.group === group);
        return groupData.at(0)!.value <= groupData.at(-1)!.value ? UP_COLOR : DOWN_COLOR;
      }}
      minValue={0}
      enableGridX={false}
      enableGridY={true}
      axisBottom={{
        tickValues: xAxisTicks.map(v => +v.group),
        format: (group: number) => {
          const date = new Date(group * TIME_RANGE * 1000);
          return dateFormatter.format(date);
        },
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

export default StockCandleGraph;
