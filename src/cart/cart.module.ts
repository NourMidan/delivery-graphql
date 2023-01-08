import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Item } from 'src/item/entities/item.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [CartResolver, CartService],
  imports: [
    TypeOrmModule.forFeature([Cart, Item, Menu]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class CartModule {}
