import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [ItemResolver, ItemService],
  imports: [
    TypeOrmModule.forFeature([Item]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class ItemModule {}
