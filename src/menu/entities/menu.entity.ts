import { ObjectType, Field, Int, registerEnumType, ID } from '@nestjs/graphql';
import { Item } from 'src/item/entities/item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Categories {
  pizza = 'pizza',
  burger = 'burger',
  pasta = 'pasta',
  dessert = 'dessert',
  drinks = 'drinks',
}
registerEnumType(Categories, {
  name: 'Categories',
});
@Entity()
@ObjectType()
export class Menu {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field((type) => [Categories])
  @Column({
    name: 'category',
    type: 'enum',
    enum: Categories,
    array: true,
    default: [Categories.burger],
  })
  category: Categories[];

  @Field((type) => Owner)
  @OneToOne(() => Owner, (owner) => owner.menu, { eager: false })
  owner: Owner;

  @OneToMany(() => Item, (item) => item.menu, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => [Item])
  items: Item[];

  @Field((type) => [Order])
  @OneToMany(() => Order, (order) => order.menu, { eager: false })
  orders: Order[];
}
