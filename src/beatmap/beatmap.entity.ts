import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BeatmapSet } from "./beatmap.set.entity";

@Entity('oc_beatmap')
export class Beatmap {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => BeatmapSet, set => set.beatmaps)
    beatmapSet: BeatmapSet

    @Column({default: ''})
    diffName: string



    @Column({type: 'json', nullable: true})
    @Exclude()
    data: any;
}