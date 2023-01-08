import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './item/item.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { OwnersModule } from './owners/owners.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
      sortSchema: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      database: 'delivery',
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
      type: 'postgres',
      password: '1234',
      port: 5432,
      username: 'postgres',
      host: 'localhost',
    }),
    UsersModule,
    CartModule,
    ItemModule,
    MenuModule,
    OrderModule,
    OwnersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
