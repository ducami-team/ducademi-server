import { StudyBoard } from 'src/api/study-board/entity/study-board.entity';
import { UserRole } from 'src/global/constatnts/userRole.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  readonly role: UserRole;

  @OneToMany(()=> StudyBoard, (study)=>study.id)
  studyBoardId : number;
}
