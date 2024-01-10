import { setCurrentStock, useCurrentStock } from '../../state/currentStock.ts';
import Stock from '../stock/Stock.tsx';
import { StockNamesQueryData } from '../../apollo/queries/stockNamesQuery.ts';
import Select from '../select/Select.tsx';
import Explainer from '../explainer/Explainer.tsx';
import GenericErrorBoundary from '../error-boundary/GenericErrorBoundary.tsx';
import styles from './StockAnalyzer.module.scss';
import GraphViewSwitch from '../graph-view-switch/GraphViewSwitch.tsx';

export interface StockAnalyzerProps {
  data: StockNamesQueryData;
}

const StockAnalyzer = ({ data }: StockAnalyzerProps) => {
  const stockFromParams = useCurrentStock();
  const stockFromParamsIsValid = stockFromParams != null && stockFromParams.length >= 3 && stockFromParams.length <= 4;
  const currentStock = stockFromParamsIsValid ? stockFromParams : data.stocks.at(0)?.symbol ?? '';

  // Note: If graphs take a long time to render, deferring the currentStock state could be a great way to improve the UX.

  return (
    <div className={styles.container}>
      <h1>Stock Analyzer</h1>

      <div className={styles.controls}>
        <Select
          value={currentStock}
          onChange={setCurrentStock}
          title={'Switch stock'}
          options={data.stocks.map(stock => ({ id: stock.symbol, label: `${stock.name} (${stock.symbol})` }))}
        />

        <GraphViewSwitch />
      </div>

      <GenericErrorBoundary key={currentStock}>
        <Stock stockSymbol={currentStock} />
      </GenericErrorBoundary>

      <Explainer />
    </div>
  );
};

export default StockAnalyzer;
