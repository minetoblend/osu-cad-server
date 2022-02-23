import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BeatmapSet } from "./beatmap.set.entity";

@Entity('oc_beatmap')
export class Beatmap {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => BeatmapSet, set => set.beatmaps)
    beatmapSet: BeatmapSet
}