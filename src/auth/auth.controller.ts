import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthService } from './jwt-auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private jwtAuthService: JwtAuthService) {}

    @Get('osu')
    @UseGuards(AuthGuard('osu'))
    @Redirect('/authenticated', 302)
    async getUser(@Req() req, @Res({ passthrough: true }) res: Response) {
        const { accessToken } = this.jwtAuthService.login(req.user);
        res.cookie('jwt', accessToken);
    }
}
