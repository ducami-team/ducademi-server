import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('board')
export class Board{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;


}