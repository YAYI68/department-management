import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
import { MessageResponse, UpdateDepartmentInput } from './dto/update-department.input';
import { PaginatedDepartments, PaginationInput } from './dto/pagination.dto';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { CreateParentSubDepartmentInput } from './dto/create-sub-department.input';
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(): Promise<Department[]>;
    findAllWithPagination(pagination?: PaginationInput): Promise<PaginatedDepartments>;
    findOne(id: number): Promise<Department>;
    createDepartment(createDepartmentInput: CreateDepartmentInput): Promise<Department>;
    getSubDepartments(department: Department): Department[];
    updateDepartment(id: number, input: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<MessageResponse>;
    createSubDepartment(input: CreateParentSubDepartmentInput): Promise<Department>;
    updateSubDepartment(input: UpdateSubDepartmentInput): Promise<Department>;
    deleteSubDepartment(id: number): Promise<{
        message: string;
    }>;
    getParentSubDepartments(parentId: number): Promise<Department[]>;
}
