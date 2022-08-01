import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rols')
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', length: 32, nullable: false, unique: true })
    name: string;

    @Column({ type: 'bool', default: true })
    status: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createAt: Date;
}
