import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<User> {
        const existingUser = await this.usersService.findByProfileId(profile.id);

        if (existingUser) {
            existingUser.accessToken = accessToken;
            existingUser.refreshToken = refreshToken;
            existingUser.displayName = profile.displayName;
            existingUser.avatarUrl = profile._json.avatar_url;
            await this.usersService.update(existingUser);
            return existingUser;
        } else {
            return await this.usersService.createFromProfile(
                profile,
                accessToken,
                refreshToken,
            );
        }
    }
}