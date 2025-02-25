import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
    id!: string

    @Column()
    @Unique('UQ_user_username', ['username'])
    username!: string

    @Column({name: 'password_hash'})
    password!: string

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!: Date
}