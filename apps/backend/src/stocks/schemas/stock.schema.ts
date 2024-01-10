import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockDataDocument = HydratedDocument<StockData>;

@Schema()
export class StockData {
  @Prop({ required: true })
  value: number;

  // Not using date here, because we only care about the relative time between each StockData.
  @Prop({ required: true })
  timestamp: number;
}

export const StockDataSchema = SchemaFactory.createForClass(StockData);

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: StockDataSchema }] })
  data: StockData[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
