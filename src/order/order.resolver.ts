import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(() => Order)
@UseGuards(AuthGuard())
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @GetUser() user: User,
  ) {
    return this.orderService.create(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'order' })
  findAll(@GetUser() user: User) {
    return this.orderService.getUserOrders(user);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('createOrderInput') updateOrderInput: UpdateOrderInput,
    @Args('id') id: string,
    @GetUser() owner: Owner,
  ) {
    return this.orderService.update(id, updateOrderInput, owner);
  }
}
