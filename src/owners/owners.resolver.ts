import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { LoginOwnerDto } from './dto/login-owner.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { LoginOwnerResponse } from './dto/login-response.dto';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.signUp(createOwnerInput);
  }

  @Mutation(() => LoginOwnerResponse)
  signIn(@Args('loginOwnerDto') loginOwnerDto: LoginOwnerDto) {
    return this.ownersService.signIn(loginOwnerDto);
  }

  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    return user;
  }
}
