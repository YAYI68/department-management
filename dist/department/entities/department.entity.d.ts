export declare class Department {
    id: number;
    name: string;
    subDepartments?: Department[];
    parent?: Department;
}
