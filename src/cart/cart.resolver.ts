import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  addToCart(@Args('item') item: string, @GetUser() user: User) {
    return this.cartService.addToCart({ item }, user);
  }

  @Mutation(() => Cart)
  removeFromCart(@Args('item') item: string, @GetUser() user: User) {
    return this.cartService.removeFromCart({ item }, user);
  }

  @Mutation(() => Cart)
  clear(@GetUser() user: User) {
    return this.cartService.clear(user);
  }

  @Query(() => Cart)
  getUserCart(@GetUser() user: User) {
    return this.cartService.getUserCart(user);
  }
}
