import { useStockNamesQuery } from './apollo/queries/stockNamesQuery.ts';
import StockAnalyzer from './components/stock-analyzer/StockAnalyzer.tsx';
import LoadingOverlay from './components/loading-overlay/LoadingOverlay.tsx';

function App() {
  const { error, loading, data } = useStockNamesQuery();

  if (error) throw error;
  if (loading || !data) return <LoadingOverlay />;

  return <StockAnalyzer data={data} />;
}

export default App;
