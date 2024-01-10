import { Injectable } from '@nestjs/common';
import { Stock } from './schemas/stock.schema';
import { Stock as StockModel } from './models/stock.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStockDataDto, CreateStockDto } from './dto/create-stock.dto';
import { mockStockData } from './tools/mockStockData';

@Injectable()
export class StocksService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  async findBySymbol(symbol: string): Promise<Stock> {
    return this.stockModel.findOne({ symbol }).exec();
  }

  async generateStockFromSymbol(symbol: string): Promise<StockModel> {
    return {
      symbol,
      notTrustworthy: true,
      data: mockStockData(symbol, 250),
    };
  }

  async createStock(stock: CreateStockDto) {
    return this.stockModel.create({
      symbol: stock.symbol,
      name: stock.name,
      description: stock.description,
      data: stock.data.map(data => ({
        value: data.value,
        timestamp: data.timestamp,
      })),
    });
  }

  async appendStockData(stockSymbol: string, stockData: CreateStockDataDto[]) {
    this.stockModel.updateOne(
      { symbol: stockSymbol },
      {
        $push: {
          data: stockData.map(data => ({
            value: data.value,
            timestamp: data.timestamp,
          })),
        },
      },
    );
  }
}
