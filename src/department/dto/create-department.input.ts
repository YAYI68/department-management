import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => [CreateDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentInput)
  @IsOptional()
  subDepartments?: CreateDepartmentInput[];
}
