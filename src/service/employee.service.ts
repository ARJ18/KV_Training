import jsonwebtoken from "jsonwebtoken";
import { AddressDto } from "../dto/createAddress.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import { jwtPayload } from "../utils/jwtPayload";
import { ErrorCodes } from "../utils/error.codes";
import EntityNotFoundException from "../excpetion/enitityNotFoundExcpetion";
import IncorrectPasswordException from "../excpetion/incorrectPasswordException";
import Department from "../entity/department.entity";
import { UpdateEmployeeDto } from "../dto/updateEmployee.dto";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees = (): Promise<Employee[]> => {
    return this.employeeRepository.find();
  };
  getEmployeeById = async (id: number) => {
    return this.employeeRepository.findOne({ id });
  };
  createEmployee = async (
    email: string,
    name: string,
    address: AddressDto,
    password: string,
    role: Role,
    department: number
  ): Promise<Employee> => {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.role = role;

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;

    newEmployee.address = newAddress;

    const newDepartment = new Department();
    newDepartment.id = department;
    newEmployee.department = newDepartment;

    return this.employeeRepository.save(newEmployee);
  };
  deleteEmployee = async (id: number): Promise<Employee> => {
    const employee = await this.getEmployeeById(id);
    return this.employeeRepository.softRemove(employee);
  };
  updateEmployee = async (
    employee: UpdateEmployeeDto,
    curremployee: Employee
  ): Promise<Employee> => {
    if (employee.address) {
      curremployee.address.line1 = employee.address.line1;
      curremployee.address.pincode = employee.address.pincode;
      delete employee.address;
    }

    Object.assign(curremployee, employee);
    curremployee.password = await bcrypt.hash(curremployee.password, 10);
    return this.employeeRepository.update(curremployee);
  };

  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findOne({ email });
    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NO_FOUND);
    }
    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY,
    });
    return token;
  };
}

export default EmployeeService;
