import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Department {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column({ unique: true })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (dept) => dept.parent, {
    cascade: true,
    eager: false,
  })
  subDepartments?: Department[];

  @ManyToOne(() => Department, (dept) => dept.subDepartments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent?: Department;
}
