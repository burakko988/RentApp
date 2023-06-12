import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseUrl } from './config/database';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(getDatabaseUrl())],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
