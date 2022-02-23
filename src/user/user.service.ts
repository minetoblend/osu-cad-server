import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findByProfileId(profileId: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { profileId } });
    }

    async update(existingUser: User) {
        return this.userRepository.save(existingUser);
    }

    async createFromProfile(
        profile: any,
        accessToken: string,
        refreshToken: string,
    ) {
        const user = new User();
        user.profileId = profile.id;
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        user.roles = [];
        user.displayName = profile.displayName;
        user.avatarUrl = profile._json.avatar_url;

        await this.userRepository.insert(user);
        return user;
    }

    async findById(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    findAll() {
        return this.userRepository.find();
    }
}
