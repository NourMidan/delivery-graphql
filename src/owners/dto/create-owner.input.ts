import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Categories } from 'src/menu/entities/menu.entity';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  menuName: string;

  @Field(() => [Categories])
  @IsNotEmpty()
  category: Categories[];
}
