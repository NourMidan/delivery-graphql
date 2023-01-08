import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Item {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.items, { eager: false })
  menu: Menu;

  @Field((type) => Cart)
  @ManyToMany(() => Cart, (cart) => cart.items, {
    eager: false,
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @Field((type) => Order)
  @ManyToMany(() => Order, (order) => order.items, {
    eager: false,
    onDelete: 'CASCADE',
  })
  order: Order;
}
