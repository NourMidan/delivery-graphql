import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  async getUserCart(user) {
    const { id } = user.cart;

    try {
      const cart = await this.cartRepository.findOne({
        where: { id },
      });

      const { category } =
        cart.menuId &&
        (await this.menuRepository.findOne({
          where: { id: cart.menuId },
        }));

      return { ...cart, category };
    } catch (error) {
      throw new UnauthorizedException('unauthorized');
    }
  }
  async addToCart(body: { item: string }, user: User) {
    const { item } = body;
    const { id } = user.cart;
    const fetchItem = await this.itemRepository.findOne({
      where: { id: item },
      select: { menu: { id: true } },
      relations: { menu: true },
    });

    if (!fetchItem) {
      throw new ConflictException('item doesnt exist');
    }

    const cart = await this.cartRepository.findOneBy({ id });

    if (cart.items.length === 0) {
      cart.items = [fetchItem];
      cart.menuId = fetchItem.menu.id;
      return await this.cartRepository.save(cart);
    } else if (fetchItem.menu.id === cart.menuId) {
      cart.items = [...cart.items, fetchItem];
      return await this.cartRepository.save(cart);
    } else {
      await this.clear(user);
      cart.items = [fetchItem];
      cart.menuId = fetchItem.menu.id;
      return await this.cartRepository.save(cart);
    }
  }
  async removeFromCart(body: { item: string }, user: User) {
    const { id } = user.cart;
    const { item } = body;

    const cart = await this.cartRepository.findOneBy({ id });

    if (cart.items.length === 1) {
      return this.clear(user);
    } else {
      const result = cart.items.filter((i) => i.id != item);

      cart.items = result;
      return await this.cartRepository.save(cart);
    }
  }

  async create() {
    const newCart = this.cartRepository.create();
    const cart = await this.cartRepository.save(newCart);

    return cart;
  }

  async clear(user: User) {
    const { id } = user.cart;
    const cart = await this.cartRepository.findOneBy({ id });
    cart.items = [];
    cart.menuId = '';
    return await this.cartRepository.save(cart);
  }
}
