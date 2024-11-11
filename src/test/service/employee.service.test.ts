import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import EmployeeRepository from "../../repository/employee.repository";
import { when } from "jest-when";
import bcrypt from "bcrypt";

describe("Employee Service Test", () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });

  it("should get all employees", async () => {
    employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
    const employees = await employeeService.getAllEmployees();
    expect(employees).toEqual([]);
  });

  it("should get an employee with given id", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ id: 3 })
      .mockResolvedValue({ id: 3, name: "Arjn" });
    employeeRepository.findOne = mockedFunction;
    const user = await employeeService.getEmployeeById(3);
    expect(user).toEqual({ id: 3, name: "Arjn" });
  });

  it("should delete an employee", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ id: 3, name: "Arjn" })
      .mockResolvedValue({ status: "deleted" });
    employeeRepository.softRemove = mockedFunction;
    const deleted = await employeeService.deleteEmployee(3);
    expect(deleted).toEqual({ status: "deleted" });
  });

  it("should throw not found exception when employee not found", async () => {
    const mockedFunction = jest.fn();
    when(mockedFunction)
        .calledWith({ email: "abc@yopmail.com" })
        .mockResolvedValue(null);
    employeeRepository.findOne = mockedFunction;
    try {
        await employeeService.loginEmployee("abc@yopmail.com", "password");
    } catch (err) {
        expect(err).toEqual(new Error("Couldnt find the required employee"));
    }
});


  it("should throw password mismatch if password mismatch", async () => {
    const bcryptMock = jest.fn();
    when(bcryptMock)
      .calledWith("password", "11111111")
      .mockResolvedValue(false);
    bcrypt.compare = bcryptMock;

    const mockedFunction = jest.fn();
    when(mockedFunction)
      .calledWith({ email: "abc@yopmail.com" })
      .mockResolvedValue({
        email: "abc@yopmail.com",
        password: "password",
      });
    employeeRepository.findOne = mockedFunction;
    try {
      await employeeService.loginEmployee("abc@yopmail.com", "password");
    } catch (err) {
      expect(err).toEqual(new Error("Incorrect Password"));
    }
  });


});
