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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const auth_constant_1 = require("./contants/auth-constant");
const typeorm_1 = require("typeorm");
const auth_enum_1 = require("./enum/auth.enum");
const config_1 = require("@nestjs/config");
let AuthService = AuthService_1 = class AuthService {
    userRepository;
    configService;
    jwtService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(userRepository, configService, jwtService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: auth_enum_1.EXPIRESIN.ACCESS,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: auth_enum_1.EXPIRESIN.REFRESH,
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt();
        const hashData = await bcrypt.hash(data, salt);
        return hashData;
    }
    async verifyHash(data, hashData) {
        const isValid = await bcrypt.compare(data, hashData);
        return isValid;
    }
    async create(signInput) {
        try {
            const existUser = await this.userRepository.findOne({
                where: { username: signInput.username },
            });
            if (existUser) {
                throw new common_1.ConflictException('Username already exists');
            }
            const hashpassword = await this.hashData(signInput.password);
            const user = this.userRepository.create({
                username: signInput.username,
                password: hashpassword,
            });
            await this.userRepository.save(user);
            const payload = {
                userId: user.id,
            };
            const token = await this.getTokens(payload);
            this.logger.log('User Sign up Successfully');
            return {
                ...token,
            };
        }
        catch (error) {
            this.logger.error('Error occur on user signup');
            throw new common_1.BadRequestException(error.message);
        }
    }
    async login(loginInput) {
        try {
            const { username, password } = loginInput;
            const user = await this.userRepository.findOne({
                where: { username },
            });
            if (!user) {
                throw new common_1.BadRequestException('invalid username/password');
            }
            const isValid = await this.verifyHash(password, user.password);
            if (!isValid) {
                throw new common_1.BadRequestException('invalid username/password');
            }
            const payload = { userId: user.id };
            const token = await this.getTokens(payload);
            this.logger.log('User login  successfully');
            return {
                ...token,
            };
        }
        catch (error) {
            this.logger.error('Error occur on user login');
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.message, error.getStatus());
            }
            throw error;
        }
    }
    async findOne(userId) {
        try {
            const existUser = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!existUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return existUser;
        }
        catch (error) {
            this.logger.error('Error occur on user');
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_constant_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map