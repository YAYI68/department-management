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
exports.MessageResponse = exports.UpdateDepartmentInput = exports.CreateSubDepartmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateSubDepartmentInput = class CreateSubDepartmentInput {
    name;
    id;
};
exports.CreateSubDepartmentInput = CreateSubDepartmentInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSubDepartmentInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateSubDepartmentInput.prototype, "id", void 0);
exports.CreateSubDepartmentInput = CreateSubDepartmentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSubDepartmentInput);
let UpdateDepartmentInput = class UpdateDepartmentInput {
    name;
    subDepartments;
};
exports.UpdateDepartmentInput = UpdateDepartmentInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateDepartmentInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [CreateSubDepartmentInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdateDepartmentInput.prototype, "subDepartments", void 0);
exports.UpdateDepartmentInput = UpdateDepartmentInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDepartmentInput);
let MessageResponse = class MessageResponse {
    message;
};
exports.MessageResponse = MessageResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MessageResponse.prototype, "message", void 0);
exports.MessageResponse = MessageResponse = __decorate([
    (0, graphql_1.ObjectType)()
], MessageResponse);
//# sourceMappingURL=update-department.input.js.map