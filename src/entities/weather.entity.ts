import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

//Don't need to use repository to save, update, delete, etc. entities
@Entity("weather")
export class Weather extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "float" })
  temperature: number;

  @Column({ type: "float" })
  humidity: number;
  
  // @Column({ type: "varchar" })
  // description: string;
  //   temp: any;
}
