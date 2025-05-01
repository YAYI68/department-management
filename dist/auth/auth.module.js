"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const current_user_interceptor_1 = require("./interceptors/current-user.interceptor");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("./entities/user.entity");
const auth_constant_1 = require("./contants/auth-constant");
const database_module_1 = require("../database/database.module");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, config_1.ConfigModule, database_module_1.DatabaseModule],
        providers: [
            {
                provide: auth_constant_1.USER_REPOSITORY,
                useFactory: (dataSource) => dataSource.getRepository(user_entity_1.User),
                inject: ['DATA_SOURCE'],
            },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_1.JwtService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: current_user_interceptor_1.CurrentUserInterceptor,
            },
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map