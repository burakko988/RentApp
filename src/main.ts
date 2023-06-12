import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/response-decorator/errorDecorator';
import { ResponseDecorator } from './common/response-decorator/responseDecorator.interceptor';
import { getDatabaseUrl } from './config/database';

async function bootstrap() {
    console.log(getDatabaseUrl());
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseDecorator());
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.use(helmet({ crossOriginOpenerPolicy: false, crossOriginEmbedderPolicy: false, contentSecurityPolicy: false, crossOriginResourcePolicy: false }));

    await app.listen(3000, '0.0.0.0', function () {
        console.log('Server has been started.');
    });
}

bootstrap();
