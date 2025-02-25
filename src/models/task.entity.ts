import {
    Column,
    CreateDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Group} from "./group.entity";
import {User} from "./user.entity";

export enum TaskType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_task_id" })
    id!: string;

    @Column({ type: "enum", enum: TaskType, name: "task_type"})
    taskType!: TaskType

    @Column()
    title!: string

    @Column({nullable: true})
    description?: string

    @Column({ name: "last_completed", nullable: true })
    lastCompleted?: Date

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date

    @Index('IDX_task_user_id')
    @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_task_user'
    })
    user?: User

    @Index('IDX_task_group_id')
    @ManyToOne(() => Group, (group) => group.tasks, { nullable: true })
    @JoinColumn({
        name: 'group_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_task_group'
    })
    group?: Group
}