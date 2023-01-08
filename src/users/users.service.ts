import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Userdata } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private jwt: JwtService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { name, email, password } = createUserInput;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hash,
    });

    let user: User;
    try {
      user = await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        const message =
          error.detail.match(/\(([^)]+)\)/)[1] + ' already Exists';
        throw new ConflictException(message);
      }
    }
    // creating cart for new user
    const newCart = this.cartRepository.create();
    const cart = await this.cartRepository.save(newCart);
    await this.usersRepository.update(user.id, { cart });
    return user;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<Userdata> {
    const { name, password } = loginUserDto;
    const user = await this.usersRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      const payload = { id: result.id, type: 'user' };
      const token = this.jwt.sign(payload);
      return { ...result, token };
    } else {
      throw new UnauthorizedException('wrong credntioals');
    }
  }
}
