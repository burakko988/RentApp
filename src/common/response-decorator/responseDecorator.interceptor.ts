import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ControllerResponse, Response } from './responses.interface';

@Injectable()
export class ResponseDecorator<T> implements NestInterceptor<T, Promise<Response>> {
    /**
     * This interceptor is called after returning response from every controller,
     * and is responsible about:
     *  - generating pagination info, based on total value
     *
     * @param context
     * @param next
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<Promise<unknown>> {
        return next.handle().pipe(
            map(async (controllerResponse: ControllerResponse): Promise<any> => {
                // Extract request and response from the context
                const response = context.switchToHttp().getResponse();

                // Extract some values from controller's response
                const { totalCount, statusCode } = controllerResponse;
                let { data } = controllerResponse;

                // Set the http-status
                const httpStatus = controllerResponse['statusCode'] || HttpStatus.OK;

                // Init the status
                const status = httpStatus > 199 && httpStatus < 400 ? 'success' : 'fail';
                let message = controllerResponse.message || 'OK';
                // Init the message

                // Modify the response
                response.statusCode = httpStatus;
                return {
                    status,
                    statusCode,
                    message,
                    data,
                    totalCount,
                };
            }),
        );
    }
}
