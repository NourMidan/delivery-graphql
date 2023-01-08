import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  // @Field()
  password: string;

  @Field((type) => [Order])
  @OneToMany(() => Order, (order) => order.user, { eager: true })
  orders: Order[];

  @Field((type) => Cart)
  @OneToOne(() => Cart, (cart) => cart.user, { eager: true })
  @JoinColumn()
  cart: Cart;
}
