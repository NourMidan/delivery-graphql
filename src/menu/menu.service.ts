import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FilterMenuDto } from './dto/filter-menu.dto';
import { Menu } from './entities/menu.entity';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  async filter(options: IPaginationOptions, filterMenuDto: FilterMenuDto) {
    const { search, category } = filterMenuDto;

    const defaultCategories = ['pizza', 'burger', 'pasta', 'dessert', 'drinks'];

    const categoryFilter = category ? [category] : defaultCategories;

    const query = this.menuRepository
      .createQueryBuilder('menu')
      .groupBy('menu.id')
      .having('LOWER(menu.name) like LOWER(:name)', { name: `%${search}%` })
      .andHaving('menu.category && :category', {
        category: categoryFilter,
      });

    try {
      const menus = await paginate<Menu>(query, options);
      return menus;
    } catch (err) {
      throw new ConflictException('unvalid category');
    }
  }

  async findOne(id: string) {
    try {
      return await this.menuRepository.findOne({
        where: { id },
        relations: { orders: true },
      });
    } catch (error) {
      throw new NotFoundException('Invalid Id');
    }
  }
}
