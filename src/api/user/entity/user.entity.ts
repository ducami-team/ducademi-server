
import { Registration } from 'src/api/registration/entity/registration.entity';
import { StudyBoard } from 'src/api/study-board/entity/study-board.entity';
import { UserRole } from 'src/global/constatnts/userRole.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  readonly id: number;

  @Column({ name: 'userId', unique : true })
  readonly userId: string;

  @Column({ name: 'password' })
  readonly password: string;

  @Column({ name: 'email' })
  readonly email: string;

  @Column({ name: 'name' })
  readonly name: string;

  @Column({ name: 'grade' })
  readonly grade: string;

  @Column({name : 'image', nullable : true})
  readonly image : string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  readonly role: UserRole;

  @CreateDateColumn({name : 'createdAt'})
  createdAt : Date;

  @OneToMany(()=> StudyBoard, (study)=>study.id)
  studyBoardId : number;

  @OneToMany(()=>Registration, (registration)=> registration.user)
  registration : Registration[];

  
}
