import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("villain")
export class VillainEntity {
  // @PrimaryColumn() for MySQL, auto gen of uuid takes place in the database
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 45, nullable: false })
  firstName: string;
  @Column({ length: 45, nullable: true })
  lastName: string;
  @Column({ length: 45, nullable: false })
  house: string;
  @Column({ length: 45, nullable: false })
  knownAs: string;
}
