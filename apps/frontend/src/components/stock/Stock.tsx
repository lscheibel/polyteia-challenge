import { useStockDetailsQuery } from '../../apollo/queries/stockDetailsQuery.ts';
import StockGraph from '../stock-graph/StockGraph.tsx';
import styles from './Stock.module.scss';

export interface StockProps {
  stockSymbol: string;
}

const StockSkeleton = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ height: '50vh', background: 'rgba(0,0,0,0.05)', borderRadius: '0.5rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ height: '1.8rem', width: '40%', background: 'rgba(0,0,0,0.05)', borderRadius: '0.5rem' }} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ height: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: '0.5rem' }} />
        ))}
        <div style={{ height: '1rem', width: '80%', background: 'rgba(0,0,0,0.05)', borderRadius: '0.5rem' }} />
      </div>
    </div>
  );
};

const Stock = ({ stockSymbol }: StockProps) => {
  const { error, loading, data } = useStockDetailsQuery(stockSymbol);

  if (error) throw error;
  if (loading || !data) return <StockSkeleton />;

  return (
    <div>
      <div className={styles.stockGraph}>
        <StockGraph data={data} />
      </div>
      {data.stock.description && (
        <>
          <h2>About</h2>
          <p>{data.stock.description}</p>
        </>
      )}
      {data.stock.notTrustworthy && (
        <strong className={styles.trustWarning}>Beware, this data might not be accurate.</strong>
      )}
    </div>
  );
};

export default Stock;
