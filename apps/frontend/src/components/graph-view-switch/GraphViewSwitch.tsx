import RadioInput from '../radio-input/RadioInput.tsx';
import IconLineChart from '../icons/LineChart.tsx';
import IconCandleChart from '../icons/CandleChart.tsx';
import { setStockGraphPreferences, useStockGraphPreferences } from '../../state/stockGraphPreferences.ts';
import { GraphTypes } from '../stock-graph/tools.ts';
import IconLineBreakChart from '../icons/LineBreakChart.tsx';

const GraphViewSwitch = () => {
  const graphType = useStockGraphPreferences().view;
  const setGraphType = (value: string) => {
    setStockGraphPreferences(curr => ({ ...curr, view: value as any }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <RadioInput
        title={'Display as line chart'}
        name={'graphType'}
        value={GraphTypes.Line}
        checked={graphType === GraphTypes.Line}
        onChange={setGraphType}
      >
        <IconLineChart />
      </RadioInput>
      <RadioInput
        title={'Display as candle chart'}
        name={'graphType'}
        value={GraphTypes.Candle}
        checked={graphType === GraphTypes.Candle}
        onChange={setGraphType}
      >
        <IconCandleChart />
      </RadioInput>
      <RadioInput
        title={'Display as line break chart'}
        name={'graphType'}
        value={GraphTypes.LineBreak}
        checked={graphType === GraphTypes.LineBreak}
        onChange={setGraphType}
      >
        <IconLineBreakChart />
      </RadioInput>
    </div>
  );
};

export default GraphViewSwitch;
