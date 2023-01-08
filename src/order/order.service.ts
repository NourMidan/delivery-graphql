import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Item } from 'src/item/entities/item.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async create(createOrderDto: CreateOrderInput, user: User) {
    const order = this.orderRepository.create({
      menu: createOrderDto.menu,
      user,
    });
    order.items = user.cart.items;

    const newOrder = await this.orderRepository.save(order);

    if (newOrder) {
      this.clearCart(user);
    }
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { menu: true, user: true },
    });
  }

  async getUserOrders(userData: User) {
    return await this.orderRepository.find({
      where: { user: { id: userData.id } },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderInput, owner: Owner) {
    const order = await this.findOne(id);
    const { status } = updateOrderDto;

    if (order.menu.id !== owner.menu.id) {
      throw new UnauthorizedException('unauthorized');
    } else {
      return await this.orderRepository.update(id, { status });
    }
  }

  async clearCart(user: User) {
    const { id } = user.cart;
    const cart = await this.cartRepository.findOneBy({ id });
    cart.items = [];
    cart.menuId = '';
    return await this.cartRepository.save(cart);
  }
}
