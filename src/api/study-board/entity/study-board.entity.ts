import { User } from "src/api/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('study')
export class StudyBoard{
    @PrimaryGeneratedColumn({name : 'id'})
    readonly id : number;

    @Column({name : 'title'})
    readonly title : string;

    @Column({name : 'description', length : 1000})
    readonly description : string;

    @Column({name : 'maxmember'})
    readonly maxmember : number;

    @Column({name : 'recommendtarget'})
    readonly recommendtarget : string;

    @ManyToOne(()=>User, (User) => User.id)
    @JoinColumn({name : 'userId'})
    userId : number;


}