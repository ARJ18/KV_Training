import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}
  find = async (): Promise<Department[]> => {
    return this.repository.find({ relations: ["employees"] });
  };

  findOne = async (filter: Partial<Department>): Promise<Department | null> => {
    return this.repository.findOne({
      where: filter,
      relations: ["employees"],
    });
  };
  save = async (department: Department): Promise<Department> => {
    return this.repository.save(department);
  };
  softRemove = async (department: Department): Promise<Department> => {
    return this.repository.softRemove(department);
  };
  update = async (department: Partial<Department>): Promise<Department> => {
    return this.repository.save(department);
  };
}
export default DepartmentRepository;
