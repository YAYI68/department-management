import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Department } from '../entities/department.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}

@ObjectType()
export class PaginatedDepartments {
  @Field(() => [Department])
  data: Department[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
