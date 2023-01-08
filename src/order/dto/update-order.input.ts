import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Status } from '../entities/order.entity';
import { IsEnum } from 'class-validator';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Status)
  @IsEnum(Status)
  status: Status;
}
