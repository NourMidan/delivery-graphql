import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;
}
