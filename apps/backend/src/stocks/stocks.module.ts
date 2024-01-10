import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schemas/stock.schema';
import { StocksResolver } from './stocks.resolver';
import { StocksSeedingService } from './stocks-seed.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }])],
  providers: [StocksService, StocksResolver, StocksSeedingService],
})
export class StocksModule {}
