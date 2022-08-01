import { Detail } from './../../details/entities/detail.entity';
import { Role } from './../../roles/entities/role.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'nvarchar', length: 128, nullable: false, select: false})
    password: string;

    @OneToOne(() => Detail)
    @JoinColumn()
    detail: Detail

    //@Column({ type: 'nvarchar', length: 255, nullable:true})
    //detail: string;

    @ManyToMany(() => Role)
    @JoinTable({name: 'user_role'})
    roles: Role[];

    @Column({ type: 'bool', default: true })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    @BeforeUpdate()
    checkEmail(){
        this.email = this.email.toLowerCase().trim();
    }
}
