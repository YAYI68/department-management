import { Department } from '../entities/department.entity';
export declare class PaginationInput {
    page: number;
    limit: number;
}
export declare class PaginatedDepartments {
    data: Department[];
    total: number;
    page: number;
    limit: number;
}
