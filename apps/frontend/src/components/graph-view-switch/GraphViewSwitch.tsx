import RadioInput from '../radio-input/RadioInput.tsx';
import IconLineChart from '../icons/LineChart.tsx';
import IconCandleChart from '../icons/CandleChart.tsx';
import { setStockGraphPreferences, useStockGraphPreferences } from '../../state/stockGraphPreferences.ts';

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
        value={'line'}
        checked={graphType === 'line'}
        onChange={setGraphType}
      >
        <IconLineChart />
      </RadioInput>
      <RadioInput
        title={'Display as candle chart'}
        name={'graphType'}
        value={'candle'}
        checked={graphType === 'candle'}
        onChange={setGraphType}
      >
        <IconCandleChart />
      </RadioInput>
    </div>
  );
};

export default GraphViewSwitch;
