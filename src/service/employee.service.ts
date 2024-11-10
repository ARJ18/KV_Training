import  jsonwebtoken  from "jsonwebtoken";
import { CreateAddressDto } from "../dto/createAddress.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import { jwtPayload } from "../utils/jwtPayload";
import { ErrorCodes } from "../utils/error.codes";
import EntityNotFoundException from "../excpetion/enitityNotFoundExcpetion";
import IncorrectPasswordException from "../excpetion/incorrectPasswordException";
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
    address: CreateAddressDto,
    password: string,
    role: Role
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

    return this.employeeRepository.save(newEmployee);
  };
  deleteEmployee = async (id: number): Promise<void> => {
    const employee = await this.getEmployeeById(id);
    await this.employeeRepository.softRemove(employee);
  };
  updateEmployee = async (employee: Employee): Promise<Employee> => {
    employee.password = await bcrypt.hash(employee.password, 10);
    return this.employeeRepository.update(employee);
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
