import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_detail')
export class Detail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', length: 64, nullable: false })
    name: string;

    @Column({ type: 'nvarchar', length: 64 })
    lastname: string;

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    address: string;

    @Column({ type: 'nvarchar', length: 32 })
    phone: string;

    @Column({ type: 'nvarchar', length: 128, nullable: true })
    ine: string;

    @Column({ type: 'nvarchar', length: 128, nullable: true })
    imagenId: string;

    @Column({ type: 'bool', default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createAt: Date;
}
