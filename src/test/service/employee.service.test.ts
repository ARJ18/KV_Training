import Employee from '../../entity/employee.entity';
import EmployeeService from '../../service/employee.service';
import EmployeeRepository from '../../repository/employee.repository';
import { when } from 'jest-when';
import bcrypt from "bcrypt"

describe("Employee Service Test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should get all employees", async () => {
        employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
        const employees = await employeeService.getAllEmployees();
        expect(employees).toEqual([]);
    });


    it("should get an employee with given id",async ()=>
    {   const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id:3}).mockResolvedValue({"id":3,"name":"Arjn"});
        employeeRepository.findOne = mockedFunction;
        const user = await employeeService.getEmployeeById(3);
        expect(user).toEqual({"id": 3, "name":"Arjn"});
        
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });

    it("should delete an employee",async()=>{
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id:3}).mockResolvedValue({});
        employeeRepository.softRemove = mockedFunction;
        const deleted = await employeeService.deleteEmployee(3);
        const deleted2 = await employeeService.deleteEmployee(3);

        expect(deleted).toEqual({});
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
    it("should throw not found exception when employee not found", async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({email: "abc@yopmail.com"}).mockResolvedValue(null);
        employeeRepository.findOne= mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("not found"));
        }
    });
    it("should throw an error when password is incorrect",async ()=>{
        const bcryptMock = bcrypt.compare as jest.Mock;
        (bcryptMock).mockResolvedValue(true);
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("not found"));
        }


    });
})



