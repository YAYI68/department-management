import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateParentSubDepartmentInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNumber()
  parentId: number;
}
