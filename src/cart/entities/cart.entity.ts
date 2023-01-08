import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => [Item])
  @ManyToMany(() => Item, (item) => item.cart, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  items: Item[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  menuId: string;

  @Field((type) => User)
  @OneToOne(() => User, (user) => user.cart, { eager: false })
  user: User;
}
