import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Menu } from 'src/menu/entities/menu.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field((type) => Boolean)
  @Column({ default: true })
  isOwner: boolean;

  @Field((type) => Menu)
  @OneToOne(() => Menu, (menu) => menu.owner, { eager: true })
  @JoinColumn()
  menu: Menu;
}
