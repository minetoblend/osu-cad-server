import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EditorModule} from './editor/editor.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {BeatmapModule} from './beatmap/beatmap.module';
import {MulterModule} from "@nestjs/platform-express";
import { diskStorage } from 'multer';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        MulterModule.register({
            dest: './tmp',
            limits: {
                fileSize: 100_000_000
            },
            storage: diskStorage({
                destination: './tmp'
            })
        }),
        EditorModule, UserModule, AuthModule, BeatmapModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
