import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  id?: number;
}
// update-department.input.ts
@InputType()
export class UpdateDepartmentInput {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  subDepartments?: CreateSubDepartmentInput[];
}

// message-response.dto.ts
@ObjectType()
export class MessageResponse {
  @Field()
  message: string;
}
