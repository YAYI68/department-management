export declare class CreateSubDepartmentInput {
    name: string;
    id?: number;
}
export declare class UpdateDepartmentInput {
    name?: string;
    subDepartments?: CreateSubDepartmentInput[];
}
export declare class MessageResponse {
    message: string;
}
