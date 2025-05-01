"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_service_1 = require("./department.service");
const create_department_input_1 = require("./dto/create-department.input");
const department_entity_1 = require("./entities/department.entity");
const update_department_input_1 = require("./dto/update-department.input");
const pagination_dto_1 = require("./dto/pagination.dto");
const update_sub_department_input_1 = require("./dto/update-sub-department.input");
const create_sub_department_input_1 = require("./dto/create-sub-department.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
let DepartmentResolver = class DepartmentResolver {
    departmentService;
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async findAll() {
        return this.departmentService.findAll();
    }
    async findAllWithPagination(pagination) {
        const normalizedPagination = {
            page: pagination?.page ?? 1,
            limit: pagination?.limit ?? 10,
        };
        return this.departmentService.findAllWithPagination(normalizedPagination);
    }
    async findOne(id) {
        return this.departmentService.findOne(id);
    }
    async createDepartment(createDepartmentInput) {
        return this.departmentService.create(createDepartmentInput);
    }
    getSubDepartments(department) {
        return department.subDepartments || [];
    }
    async updateDepartment(id, input) {
        return this.departmentService.update(id, input);
    }
    async deleteDepartment(id) {
        return this.departmentService.remove(id);
    }
    async createSubDepartment(input) {
        return this.departmentService.createSubDepartment(input);
    }
    async updateSubDepartment(input) {
        return this.departmentService.updateSubDepartment(input);
    }
    async deleteSubDepartment(id) {
        return this.departmentService.deleteSubDepartment(id);
    }
    async getParentSubDepartments(parentId) {
        return this.departmentService.findSubDepartments(parentId);
    }
};
exports.DepartmentResolver = DepartmentResolver;
__decorate([
    (0, graphql_1.Query)(() => [department_entity_1.Department], { name: 'departments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => pagination_dto_1.PaginatedDepartments, { name: 'getDepartments' }),
    __param(0, (0, graphql_1.Args)('pagination', { type: () => pagination_dto_1.PaginationInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findAllWithPagination", null);
__decorate([
    (0, graphql_1.Query)(() => department_entity_1.Department, { name: 'getDepartment' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_input_1.CreateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "createDepartment", null);
__decorate([
    (0, graphql_1.ResolveField)('subDepartments', () => [department_entity_1.Department]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_entity_1.Department]),
    __metadata("design:returntype", void 0)
], DepartmentResolver.prototype, "getSubDepartments", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_department_input_1.UpdateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "updateDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_department_input_1.MessageResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "deleteDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_department_input_1.CreateParentSubDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "createSubDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_sub_department_input_1.UpdateSubDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "updateSubDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_department_input_1.MessageResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "deleteSubDepartment", null);
__decorate([
    (0, graphql_1.Query)(() => [department_entity_1.Department]),
    __param(0, (0, graphql_1.Args)('parentId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentResolver.prototype, "getParentSubDepartments", null);
exports.DepartmentResolver = DepartmentResolver = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Resolver)(() => department_entity_1.Department),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentResolver);
//# sourceMappingURL=department.resolver.js.map