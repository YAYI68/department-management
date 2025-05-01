import { JwtService } from '@nestjs/jwt';
import { SignInput } from './dto/sign-inputs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userRepository;
    private configService;
    private jwtService;
    private logger;
    constructor(userRepository: Repository<User>, configService: ConfigService, jwtService: JwtService);
    private getTokens;
    hashData(data: string): Promise<any>;
    verifyHash(data: string, hashData: string): Promise<any>;
    create(signInput: SignInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginInput: SignInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findOne(userId: string): Promise<User>;
}
