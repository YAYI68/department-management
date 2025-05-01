import {
  BadRequestException,
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.interface';
import { USER_REPOSITORY } from './contants/auth-constant';
import { SignInput } from './dto/sign-inputs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EXPIRESIN } from './enum/auth.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: EXPIRESIN.ACCESS,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: EXPIRESIN.REFRESH,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    const hashData = await bcrypt.hash(data, salt);
    return hashData;
  }

  // To verify the hash function
  async verifyHash(data: string, hashData: string) {
    const isValid = await bcrypt.compare(data, hashData);
    return isValid;
  }

  async create(signInput: SignInput) {
    try {
      const existUser = await this.userRepository.findOne({
        where: { username: signInput.username },
      });
      if (existUser) {
        throw new ConflictException('Username already exists');
      }

      const hashpassword = await this.hashData(signInput.password);
      const user = this.userRepository.create({
        username: signInput.username,
        password: hashpassword,
      });
      await this.userRepository.save(user);
      const payload: JwtPayload = {
        userId: user.id,
      };
      const token = await this.getTokens(payload);
      this.logger.log('User Sign up Successfully');
      return {
        ...token,
      };
    } catch (error) {
      this.logger.error('Error occur on user signup');
      throw new BadRequestException(error.message);
    }
  }

  async login(loginInput: SignInput) {
    try {
      const { username, password } = loginInput;
      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (!user) {
        throw new BadRequestException('invalid username/password');
      }
      const isValid = await this.verifyHash(password, user.password);
      if (!isValid) {
        throw new BadRequestException('invalid username/password');
      }
      const payload: JwtPayload = { userId: user.id };
      const token = await this.getTokens(payload);
      this.logger.log('User login  successfully');
      return {
        ...token,
      };
    } catch (error) {
      this.logger.error('Error occur on user login');
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw error;
    }
  }

  async findOne(userId: string) {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!existUser) {
        throw new NotFoundException('User not found');
      }
      return existUser;
    } catch (error) {
      this.logger.error('Error occur on user');
      throw new BadRequestException(error.message);
    }
  }
}
