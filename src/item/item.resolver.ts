import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  @UseGuards(AuthGuard())
  create(
    @Args('createItemDto') createItemDto: CreateItemInput,
    @GetUser() owner: Owner,
  ) {
    return this.itemService.create(createItemDto, owner);
  }

  @Query(() => Item)
  findOne(@Args('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard())
  update(
    @Args('id') id: string,
    @Args('updateItemDto') updateItemDto: UpdateItemInput,
    @GetUser() owner: Owner,
  ) {
    return this.itemService.update(id, updateItemDto, owner);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard())
  remove(@Args('id') id: string, @GetUser() owner: Owner) {
    return this.itemService.remove(id, owner);
  }
}
