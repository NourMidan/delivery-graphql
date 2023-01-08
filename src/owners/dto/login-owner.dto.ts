import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class LoginOwnerDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
