import { User } from "src/api/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('study')
export class StudyBoard{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;

    @Column({name : 'title'})
    title : string;

    @Column({name : 'description', length : 1000})
    description : string;

    @Column({name : 'maxmember'})
    maxmember : number;

    @Column({name : 'recommendtarget'})
    recommendtarget : string;

    @ManyToOne(()=>User, (User) => User.id)
    @JoinColumn({name : 'userId'})
    userId : string;


}