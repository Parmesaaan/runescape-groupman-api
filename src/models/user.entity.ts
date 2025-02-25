import {BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({unique: true})
    username!: string

    @Column({name: 'password_hash'})
    password!: string

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!: Date
}