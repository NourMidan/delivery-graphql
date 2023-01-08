import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Item } from 'src/item/entities/item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, Item, Cart]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class OrderModule {}
