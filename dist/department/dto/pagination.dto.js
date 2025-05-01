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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedDepartments = exports.PaginationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_entity_1 = require("../entities/department.entity");
const class_validator_1 = require("class-validator");
let PaginationInput = class PaginationInput {
    page;
    limit;
};
exports.PaginationInput = PaginationInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1 }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10 }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "limit", void 0);
exports.PaginationInput = PaginationInput = __decorate([
    (0, graphql_1.InputType)()
], PaginationInput);
let PaginatedDepartments = class PaginatedDepartments {
    data;
    total;
    page;
    limit;
};
exports.PaginatedDepartments = PaginatedDepartments;
__decorate([
    (0, graphql_1.Field)(() => [department_entity_1.Department]),
    __metadata("design:type", Array)
], PaginatedDepartments.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedDepartments.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedDepartments.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedDepartments.prototype, "limit", void 0);
exports.PaginatedDepartments = PaginatedDepartments = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedDepartments);
//# sourceMappingURL=pagination.dto.js.map