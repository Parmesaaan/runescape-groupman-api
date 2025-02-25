import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";
import {Group} from "./group.entity";

@Entity('note')
export class Note {
    @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_note_id' })
    id!: string;

    @Column()
    title!: string;

    @Column()
    contents!: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!: Date

    @ManyToOne(() => User, user => user.notes, { nullable: true })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_note_user'
    })
    user?: User;

    @ManyToOne(() => Group, group => group.notes, { nullable: true })
    @JoinColumn({
        name: 'group_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_note_group'
    })
    group?: Group;
}