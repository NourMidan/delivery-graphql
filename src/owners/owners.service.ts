import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories, Menu } from 'src/menu/entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';
import * as bcrypt from 'bcrypt';
import { OwnerData } from './interfaces';
import { LoginOwnerDto } from './dto/login-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,

    private jwt: JwtService,
  ) {}
  async signUp(createOwnerDto: CreateOwnerInput): Promise<Owner> {
    const { name, email, password, menuName, category } = createOwnerDto;

    //check if categories match the enum

    function isCategories(value: string): value is Categories {
      return Object.values<string>(Categories).includes(value);
    }

    const checkMenu = await this.menuRepository.findOne({
      where: { name: menuName },
    });
    if (checkMenu) {
      throw new ConflictException('menu with this name already exist');
    }

    category.forEach((item) => {
      if (!isCategories(item)) {
        throw new ConflictException('unvalid categories');
      }
    });

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newOwner = this.ownersRepository.create({
      name,
      email,
      password: hash,
    });

    let owner: Owner;
    try {
      owner = await this.ownersRepository.save(newOwner);
    } catch (error) {
      if (error.code === '23505') {
        const message =
          error.detail.match(/\(([^)]+)\)/)[1] + ' already Exists';
        throw new ConflictException(message);
      }
    }
    // creating Menu for new owner
    const newMenu = this.menuRepository.create({
      name: menuName,
      category,
    });
    const menu = await this.menuRepository.save(newMenu);
    await this.ownersRepository.update(owner.id, { menu });
    return owner;
  }
  async signIn(loginOwnerDto: LoginOwnerDto): Promise<OwnerData> {
    const { name, password } = loginOwnerDto;
    const owner = await this.ownersRepository.findOneBy({ name });
    if (owner && (await bcrypt.compare(password, owner.password))) {
      const { password, ...result } = owner;
      const payload = { id: result.id, type: 'owner' };
      const token = this.jwt.sign(payload);
      return { ...result, token };
    } else {
      throw new UnauthorizedException('wrong credntioals');
    }
  }
}
