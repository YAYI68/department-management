import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PaginatedDepartments, PaginationInput } from './dto/pagination.dto';
import { CreateParentSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
export declare class DepartmentService {
    private departmentRepository;
    private logger;
    constructor(departmentRepository: Repository<Department>);
    findAll(): Promise<Department[]>;
    findAllWithPagination(pagination: PaginationInput): Promise<PaginatedDepartments>;
    findOne(id: number): Promise<Department>;
    create(input: CreateDepartmentInput): Promise<Department>;
    update(id: number, input: UpdateDepartmentInput): Promise<Department>;
    remove(id: number): Promise<{
        message: string;
    }>;
    createSubDepartment(input: CreateParentSubDepartmentInput): Promise<Department>;
    updateSubDepartment(input: UpdateSubDepartmentInput): Promise<Department>;
    deleteSubDepartment(id: number): Promise<{
        message: string;
    }>;
    findSubDepartments(parentId: number): Promise<Department[]>;
}
