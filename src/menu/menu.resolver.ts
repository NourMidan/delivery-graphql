import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Categories, Menu } from './entities/menu.entity';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [Menu])
  createMenu(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('search') search: string,
    @Args('category') category: Categories,
  ) {
    const options: IPaginationOptions = { page, limit };
    const filterMenuDto: FilterMenuDto = { search, category };
    return this.menuService.filter(options, filterMenuDto);
  }

  @Query(() => Menu)
  findOne(@Args('id') id: string) {
    return this.menuService.findOne(id);
  }
}
