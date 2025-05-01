import { AuthService } from './auth.service';
import { SignInput } from './dto/sign-inputs';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signInput: SignInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginInput: SignInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
