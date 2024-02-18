import { StudyBoard } from "src/api/study-board/entity/study-board.entity";
import { User } from "src/api/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('registration')
export class Registration{
    @PrimaryGeneratedColumn({name : 'id'})
    readonly id : number;


    @ManyToOne(()=> StudyBoard, study => study.registration)
    readonly study : StudyBoard;

    @ManyToOne(()=> User, user => user.registration)
    readonly user : User;

    @CreateDateColumn({name : 'registrationDate'})
    readonly registrationDate : Date;
}