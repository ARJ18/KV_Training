import Employee from "../entity/employee.entity";
import { Repository } from "typeorm";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  find = async (): Promise<Employee[]> => {
    return this.repository.find({ relations: ["address"] });
  };

  findOne = async (filter: Partial<Employee>): Promise<Employee | null> => {
    return this.repository.findOne({
      where: filter,
      relations: ["address"],
    });
  };
  save = async (employee: Employee): Promise<Employee> => {
    return this.repository.save(employee);
  };
  softRemove = async (employee: Employee): Promise<void> => {
    await this.repository.softRemove(employee);
  };
  update = async (employee: Partial<Employee>): Promise<Employee> => {
    return this.repository.save(employee);
  };
}

export default EmployeeRepository;
