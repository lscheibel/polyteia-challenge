import { MaxLength, MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetStockArgs {
  @Field()
  @MinLength(3)
  @MaxLength(4)
  symbol: string;
}
