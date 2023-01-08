import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Item } from 'src/item/entities/item.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  prepairng = 'prepairng',
  delivering = 'delivering',
  delivered = 'delivered',
}

registerEnumType(Status, {
  name: 'Status',
});
@Entity()
@ObjectType()
export class Order {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.prepairng,
  })
  status: Status;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: false })
  user: User;

  @Field((type) => Menu)
  @ManyToOne(() => Menu, (menu) => menu.orders, { eager: false })
  menu: Menu;

  @Field((type) => [Item])
  @ManyToMany(() => Item, (item) => item.order, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  items: Item[];
}
