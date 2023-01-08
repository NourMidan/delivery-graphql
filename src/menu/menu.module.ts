import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  providers: [MenuResolver, MenuService],
  imports: [TypeOrmModule.forFeature([Menu, Item])],
})
export class MenuModule {}
