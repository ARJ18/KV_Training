import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  getAllDepartments = (): Promise<Department[]> => {
    return this.departmentRepository.find();
  };
  getDepartmentById = async (id: number) => {
    return this.departmentRepository.findOne({ id });
  };
  createDepartment = async (name: string): Promise<Department> => {
    const newDepartment = new Department();

    newDepartment.name = name;

    return this.departmentRepository.save(newDepartment);
  };
  deleteDepartment = async (id: number): Promise<Department | null> => {
    const department = await this.getDepartmentById(id);
    if (department.employees.length > 0) return null;
    return this.departmentRepository.softRemove(department);
  };
  updateDepartment = async (department: Department): Promise<Department> => {
    return this.departmentRepository.update(department);
  };
}

export default DepartmentService;
