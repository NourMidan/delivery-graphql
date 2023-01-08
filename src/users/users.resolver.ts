import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Body, UseGuards, Request } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => LoginResponse)
  signInUser(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    return this.usersService.signIn(loginUserDto);
  }

  @Query(() => User)
  @UseGuards(AuthGuard())
  getProfile(@Request() req, @GetUser() user: User) {
    return user;
  }
}
