import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Beatmap } from "./beatmap.entity";

@Entity('oc_beatmapset')
export class BeatmapSet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Beatmap, beatmap => beatmap.beatmapSet)
    beatmaps: Beatmap[]

    @Column('integer')
    duration: number

    //region metadata
    @Column({default: ''})
    title: string

    @Column({default: ''})
    titleUnicode: string

    @Column({default: ''})
    artist: string

    @Column({default: ''})
    artistUnicode: string
    //endregion
}