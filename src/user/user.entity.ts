import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity('oc_user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    displayName: string;

    @Column()
    profileId: number;

    @Column({nullable: true})
    avatarUrl: string;

    @Column({type: 'simple-array'})
    roles: string[];

    @Column()
    @Exclude()
    accessToken: string;

    @Column('longtext')
    @Exclude()
    refreshToken: string;
}

