import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jtw.auth.guard";

@Controller('api/user')
export class UserController {

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getOwnProfile(@Req() req) {
        return req.user;
    }

}
