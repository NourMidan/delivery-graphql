import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Owner } from '../entities/owner.entity';

@ObjectType()
export class LoginOwnerResponse extends Owner {
  @Field()
  token: string;
}
