import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Item } from 'src/item/entities/item.entity';
import { Menu } from 'src/menu/entities/menu.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  @IsNotEmpty()
  items: Item[];

  @Field(() => ID)
  @IsNotEmpty()
  menu: Menu;
}
