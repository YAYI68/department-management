import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
import {
  MessageResponse,
  UpdateDepartmentInput,
} from './dto/update-department.input';
import { PaginatedDepartments, PaginationInput } from './dto/pagination.dto';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { CreateParentSubDepartmentInput } from './dto/create-sub-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => [Department], { name: 'departments' })
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Query(() => PaginatedDepartments, { name: 'getDepartments' })
  async findAllWithPagination(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ): Promise<PaginatedDepartments> {
    const normalizedPagination = {
      page: pagination?.page ?? 1,
      limit: pagination?.limit ?? 10,
    };

    return this.departmentService.findAllWithPagination(normalizedPagination);
  }

  @Query(() => Department, { name: 'getDepartment' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  async createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.create(createDepartmentInput);
  }

  @ResolveField('subDepartments', () => [Department])
  getSubDepartments(@Parent() department: Department) {
    return department.subDepartments || [];
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentService.update(id, input);
  }

  @Mutation(() => MessageResponse)
  async deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MessageResponse> {
    return this.departmentService.remove(id);
  }

  @Mutation(() => Department)
  async createSubDepartment(
    @Args('input') input: CreateParentSubDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.createSubDepartment(input);
  }

  @Mutation(() => Department)
  async updateSubDepartment(
    @Args('input') input: UpdateSubDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.updateSubDepartment(input);
  }

  @Mutation(() => MessageResponse)
  async deleteSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.deleteSubDepartment(id);
  }

  @Query(() => [Department])
  async getParentSubDepartments(
    @Args('parentId', { type: () => Int }) parentId: number,
  ): Promise<Department[]> {
    return this.departmentService.findSubDepartments(parentId);
  }
}
