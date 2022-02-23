import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EditorModule} from './editor/editor.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BeatmapModule } from './beatmap/beatmap.module';

@Module({
    imports: [EditorModule, TypeOrmModule.forRoot(), UserModule, AuthModule, BeatmapModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
