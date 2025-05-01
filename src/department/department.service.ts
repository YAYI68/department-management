import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
import { DEPARTMENT_REPOSITORY } from './contants/department.constant';
import { Repository } from 'typeorm';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PaginatedDepartments, PaginationInput } from './dto/pagination.dto';
import { CreateParentSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

@Injectable()
export class DepartmentService {
  private logger = new Logger(DepartmentService.name);
  constructor(
    @Inject(DEPARTMENT_REPOSITORY)
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    try {
      return this.departmentRepository.find({
        relations: ['subDepartments'],
      });
    } catch (error) {
      this.logger.error('Error occur getting department');
      throw new BadRequestException(
        `Error occur while getting department ${error}`,
      );
    }
  }

  async findAllWithPagination(
    pagination: PaginationInput,
  ): Promise<PaginatedDepartments> {
    const { page, limit } = pagination;
    const [data, total] = await this.departmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['subDepartments'],
      order: { name: 'ASC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
        relations: ['subDepartments'],
      });

      if (!department) {
        throw new NotFoundException(`Department not found`);
      }
      this.logger.log('Getting Department');
      return department;
    } catch (error) {
      this.logger.error('Error occur getting department with ID ${id}');
      throw new BadRequestException(
        `Error occur while getting department ${error}`,
      );
    }
  }

  async create(input: CreateDepartmentInput) {
    try {
      const existingDept = await this.departmentRepository.findOne({
        where: { name: input.name },
        relations: ['subDepartments'],
      });

      if (
        existingDept &&
        (!input.subDepartments || !input.subDepartments.length)
      ) {
        throw new ConflictException(`Department ${input.name} already exists.`);
      }

      if (existingDept && input.subDepartments && input.subDepartments.length) {
        const createdSubs = await Promise.all(
          input.subDepartments.map(async (sub) => {
            const subDept = new Department();
            subDept.name = sub.name;
            subDept.parent = existingDept;
            return await this.departmentRepository.save(subDept);
          }),
        );
        return { ...existingDept, subDepartments: createdSubs };
      }

      const department = new Department();
      department.name = input.name;

      if (input.subDepartments && input.subDepartments.length) {
        department.subDepartments = await Promise.all(
          input.subDepartments.map(async (sub) => {
            const subDept = new Department();
            subDept.name = sub.name;
            this.logger.log('Creating SubDepartment');
            return await this.departmentRepository.save(subDept);
          }),
        );
      }
      this.logger.log('Creating Department');
      return this.departmentRepository.save(department);
    } catch (error) {
      this.logger.error('Error occur while creating department');
      throw new BadRequestException(
        `Error occur while creating department ${error}`,
      );
    }
  }

  async update(id: number, input: UpdateDepartmentInput) {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
        relations: ['subDepartments'],
      });

      if (!department) {
        throw new NotFoundException(`Department with id ${id} not found.`);
      }

      if (input.name) {
        department.name = input.name;
      }

      if (input.subDepartments && input.subDepartments.length) {
        const updatedSubs = await Promise.all(
          input.subDepartments.map(async (sub) => {
            let subDept = await this.departmentRepository.findOne({
              where: { id: sub.id },
            });
            if (!subDept) {
              subDept = new Department();
            }
            subDept.name = sub.name;
            subDept.parent = department;
            return await this.departmentRepository.save(subDept);
          }),
        );
        department.subDepartments = updatedSubs;
      }
      return this.departmentRepository.save(department);
    } catch (error) {
      this.logger.error(`Error occur while updating department with ${id}`);
      throw new BadRequestException(
        `Error occur while deleting department ${error}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
        relations: ['subDepartments'],
      });

      if (!department) {
        throw new NotFoundException(`Department not found.`);
      }
      if (department.subDepartments && department.subDepartments.length) {
        await Promise.all(
          department.subDepartments.map((sub) =>
            this.departmentRepository.remove(sub),
          ),
        );
      }

      await this.departmentRepository.remove(department);
      return { message: `Department with id ${id} deleted successfully.` };
    } catch (error) {
      this.logger.error('Error occur while deleting department');
      throw new BadRequestException(
        `Error occur while deleting department ${error}`,
      );
    }
  }

  async createSubDepartment(
    input: CreateParentSubDepartmentInput,
  ): Promise<Department> {
    try {
      const parent = await this.departmentRepository.findOne({
        where: { id: input.parentId },
      });
      if (!parent) throw new NotFoundException('Parent department not found');

      const subDept = this.departmentRepository.create({
        name: input.name,
        parent,
      });

      return this.departmentRepository.save(subDept);
    } catch (error) {
      this.logger.error(`Error occur while creating subdepartment`);
      throw new BadRequestException(
        `Error occur while creating subdepartment ${error}`,
      );
    }
  }

  async updateSubDepartment(
    input: UpdateSubDepartmentInput,
  ): Promise<Department> {
    try {
      const subDept = await this.departmentRepository.findOne({
        where: { id: input.id },
        relations: ['parent'],
      });
      if (!subDept) throw new NotFoundException('SubDepartment not found');

      if (input.name) subDept.name = input.name;
      if (input.parentId) {
        const parent = await this.departmentRepository.findOne({
          where: { id: input.parentId },
        });
        if (!parent) throw new NotFoundException('Parent not found');
        subDept.parent = parent;
      }

      return this.departmentRepository.save(subDept);
    } catch (error) {
      this.logger.error(
        `Error occur while updating subdepartment ID:${input.id}`,
      );
      throw new BadRequestException(
        `Error occur while updating subdepartment ${error}`,
      );
    }
  }

  async deleteSubDepartment(id: number) {
    try {
      const subDept = await this.departmentRepository.findOne({
        where: { id },
        relations: ['parent'],
      });
      if (!subDept) throw new NotFoundException('SubDepartment not found');

      await this.departmentRepository.remove(subDept);
      return { message: `SubDepartment with id ${id} deleted successfully.` };
    } catch (error) {
      this.logger.error(`Error occur while deleting subdepartment ID:${id}`);
      throw new BadRequestException(
        `Error occur while deleting department ${error}`,
      );
    }
  }

  async findSubDepartments(parentId: number): Promise<Department[]> {
    try {
      return this.departmentRepository.find({
        where: { parent: { id: parentId } },
        relations: ['parent'],
      });
    } catch (error) {
      this.logger.error(
        `Error occur while fetching subdepartment ParentID:${parentId}`,
      );
      throw new BadRequestException(
        `Error occur while fetching subdepartment ${error}`,
      );
    }
  }
}
