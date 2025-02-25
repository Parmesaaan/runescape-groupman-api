import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique, UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";

@Entity('group')
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_group_id' })
    id!: string

    @Column()
    @Unique('UQ_group_name', ['name'])
    name!: string

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!: Date

    @ManyToMany(() => User, user => user.groups)
    @JoinTable({
        name: 'group_members',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_group_members_group_id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_group_members_user_id'
        },
    })
    members!: Array<User>
}