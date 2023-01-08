import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { User } from '../entities/user.entity';

@ObjectType()
export class LoginResponse extends User {
  @Field()
  token: string;
}
