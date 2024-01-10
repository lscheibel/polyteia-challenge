import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Stock {
  @Field(type => ID)
  symbol: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true, description: 'Indicates that the data was generated on the fly.' })
  notTrustworthy?: boolean;

  @Field(type => [StockData])
  data: StockData[];
}

@ObjectType()
export class StockData {
  @Field(type => Float)
  value: number;

  // Todo: Suffers from the year 2038 problem.
  @Field(type => Int, { description: 'UTC timestamp in seconds.' })
  timestamp: number;
}
