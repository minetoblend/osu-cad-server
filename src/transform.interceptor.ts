import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { instanceToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next.handle().pipe(map((data) => instanceToPlain(data)));
    }
}