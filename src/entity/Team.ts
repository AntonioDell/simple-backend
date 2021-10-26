import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Team extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
