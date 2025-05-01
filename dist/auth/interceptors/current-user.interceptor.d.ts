import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
export declare class CurrentUserInterceptor implements NestInterceptor {
    constructor();
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<import("rxjs").Observable<any>>;
}
