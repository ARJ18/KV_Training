import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  name: string;
  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  }) 
  address: Address

  @Column({nullable:true})
  password:string;

  @Column({nullable:true})
  role:Role;
}

export default Employee;
