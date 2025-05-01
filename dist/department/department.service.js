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
var DepartmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_entity_1 = require("./entities/department.entity");
const department_constant_1 = require("./contants/department.constant");
const typeorm_1 = require("typeorm");
let DepartmentService = DepartmentService_1 = class DepartmentService {
    departmentRepository;
    logger = new common_1.Logger(DepartmentService_1.name);
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async findAll() {
        try {
            return this.departmentRepository.find({
                relations: ['subDepartments'],
            });
        }
        catch (error) {
            this.logger.error('Error occur getting department');
            throw new common_1.BadRequestException(`Error occur while getting department ${error}`);
        }
    }
    async findAllWithPagination(pagination) {
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
    async findOne(id) {
        try {
            const department = await this.departmentRepository.findOne({
                where: { id },
                relations: ['subDepartments'],
            });
            if (!department) {
                throw new common_1.NotFoundException(`Department not found`);
            }
            this.logger.log('Getting Department');
            return department;
        }
        catch (error) {
            this.logger.error('Error occur getting department with ID ${id}');
            throw new common_1.BadRequestException(`Error occur while getting department ${error}`);
        }
    }
    async create(input) {
        try {
            const existingDept = await this.departmentRepository.findOne({
                where: { name: input.name },
                relations: ['subDepartments'],
            });
            if (existingDept &&
                (!input.subDepartments || !input.subDepartments.length)) {
                throw new common_1.ConflictException(`Department ${input.name} already exists.`);
            }
            if (existingDept && input.subDepartments && input.subDepartments.length) {
                const createdSubs = await Promise.all(input.subDepartments.map(async (sub) => {
                    const subDept = new department_entity_1.Department();
                    subDept.name = sub.name;
                    subDept.parent = existingDept;
                    return await this.departmentRepository.save(subDept);
                }));
                return { ...existingDept, subDepartments: createdSubs };
            }
            const department = new department_entity_1.Department();
            department.name = input.name;
            if (input.subDepartments && input.subDepartments.length) {
                department.subDepartments = await Promise.all(input.subDepartments.map(async (sub) => {
                    const subDept = new department_entity_1.Department();
                    subDept.name = sub.name;
                    this.logger.log('Creating SubDepartment');
                    return await this.departmentRepository.save(subDept);
                }));
            }
            this.logger.log('Creating Department');
            return this.departmentRepository.save(department);
        }
        catch (error) {
            this.logger.error('Error occur while creating department');
            throw new common_1.BadRequestException(`Error occur while creating department ${error}`);
        }
    }
    async update(id, input) {
        try {
            const department = await this.departmentRepository.findOne({
                where: { id },
                relations: ['subDepartments'],
            });
            if (!department) {
                throw new common_1.NotFoundException(`Department with id ${id} not found.`);
            }
            if (input.name) {
                department.name = input.name;
            }
            if (input.subDepartments && input.subDepartments.length) {
                const updatedSubs = await Promise.all(input.subDepartments.map(async (sub) => {
                    let subDept = await this.departmentRepository.findOne({
                        where: { id: sub.id },
                    });
                    if (!subDept) {
                        subDept = new department_entity_1.Department();
                    }
                    subDept.name = sub.name;
                    subDept.parent = department;
                    return await this.departmentRepository.save(subDept);
                }));
                department.subDepartments = updatedSubs;
            }
            return this.departmentRepository.save(department);
        }
        catch (error) {
            this.logger.error(`Error occur while updating department with ${id}`);
            throw new common_1.BadRequestException(`Error occur while deleting department ${error}`);
        }
    }
    async remove(id) {
        try {
            const department = await this.departmentRepository.findOne({
                where: { id },
                relations: ['subDepartments'],
            });
            if (!department) {
                throw new common_1.NotFoundException(`Department not found.`);
            }
            if (department.subDepartments && department.subDepartments.length) {
                await Promise.all(department.subDepartments.map((sub) => this.departmentRepository.remove(sub)));
            }
            await this.departmentRepository.remove(department);
            return { message: `Department with id ${id} deleted successfully.` };
        }
        catch (error) {
            this.logger.error('Error occur while deleting department');
            throw new common_1.BadRequestException(`Error occur while deleting department ${error}`);
        }
    }
    async createSubDepartment(input) {
        try {
            const parent = await this.departmentRepository.findOne({
                where: { id: input.parentId },
            });
            if (!parent)
                throw new common_1.NotFoundException('Parent department not found');
            const subDept = this.departmentRepository.create({
                name: input.name,
                parent,
            });
            return this.departmentRepository.save(subDept);
        }
        catch (error) {
            this.logger.error(`Error occur while creating subdepartment`);
            throw new common_1.BadRequestException(`Error occur while creating subdepartment ${error}`);
        }
    }
    async updateSubDepartment(input) {
        try {
            const subDept = await this.departmentRepository.findOne({
                where: { id: input.id },
                relations: ['parent'],
            });
            if (!subDept)
                throw new common_1.NotFoundException('SubDepartment not found');
            if (input.name)
                subDept.name = input.name;
            if (input.parentId) {
                const parent = await this.departmentRepository.findOne({
                    where: { id: input.parentId },
                });
                if (!parent)
                    throw new common_1.NotFoundException('Parent not found');
                subDept.parent = parent;
            }
            return this.departmentRepository.save(subDept);
        }
        catch (error) {
            this.logger.error(`Error occur while updating subdepartment ID:${input.id}`);
            throw new common_1.BadRequestException(`Error occur while updating subdepartment ${error}`);
        }
    }
    async deleteSubDepartment(id) {
        try {
            const subDept = await this.departmentRepository.findOne({
                where: { id },
                relations: ['parent'],
            });
            if (!subDept)
                throw new common_1.NotFoundException('SubDepartment not found');
            await this.departmentRepository.remove(subDept);
            return { message: `SubDepartment with id ${id} deleted successfully.` };
        }
        catch (error) {
            this.logger.error(`Error occur while deleting subdepartment ID:${id}`);
            throw new common_1.BadRequestException(`Error occur while deleting department ${error}`);
        }
    }
    async findSubDepartments(parentId) {
        try {
            return this.departmentRepository.find({
                where: { parent: { id: parentId } },
                relations: ['parent'],
            });
        }
        catch (error) {
            this.logger.error(`Error occur while fetching subdepartment ParentID:${parentId}`);
            throw new common_1.BadRequestException(`Error occur while fetching subdepartment ${error}`);
        }
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = DepartmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(department_constant_1.DEPARTMENT_REPOSITORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DepartmentService);
//# sourceMappingURL=department.service.js.map