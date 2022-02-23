import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt.strategy';
import { OsuStrategy } from './osu.strategy';

@Module({
  providers: [AuthService, OsuStrategy, JwtAuthService, JwtAuthStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 86400,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}