import { Args, Query, Resolver } from '@nestjs/graphql';
import { StocksService } from './stocks.service';
import { Stock } from './models/stock.model';
import { GetStockArgs } from './dto/get-stock.args';

@Resolver(of => Stock)
export class StocksResolver {
  constructor(private stocksService: StocksService) {}

  @Query(returns => Stock, { name: 'stock' })
  async getStock(@Args() { symbol }: GetStockArgs): Promise<Stock> {
    let stock: Stock = await this.stocksService.findBySymbol(symbol);

    if (!stock) {
      stock = await this.stocksService.generateStockFromSymbol(symbol);
    }

    return stock;
  }

  @Query(returns => [Stock], { name: 'stocks' })
  getAllStocks(): Promise<Stock[]> {
    return this.stocksService.findAll();
  }
}
