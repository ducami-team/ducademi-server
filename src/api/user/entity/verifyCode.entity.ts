import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('verifycode')
export class VerifyCode{
    @PrimaryGeneratedColumn({name : 'id'})
    readonly id : number;


    @Column({name : 'code', unique : true})
    readonly code : string;

    @CreateDateColumn({name : 'createdAt'})
    readonly createdAt : Date;


    @OneToOne(()=>User, (user)=>user.verifyCode)
    @JoinColumn()
    readonly user: User;
}