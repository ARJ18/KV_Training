import express, { NextFunction, Request, Response } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../excpetion/http.exception";
import { CreateEmployeeDto } from "../dto/createEmployee.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dto/updateEmployee.dto";
import IncorrectPasswordException from "../excpetion/incorrectPasswordException";
import { ErrorCodes } from "../utils/error.codes";
import authorize from "../middleware/authorize.middleware";
import { RequestWithUser } from "../utils/requestWithUser";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/",authorize, this.createEmployee);
    this.router.put("/:id", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
    this.router.post("/login",this.loginEmployee);
  }

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.employeeService.getAllEmployees();
      if (employees.length == 0) {
        const error = new Error("No employees found");
        throw error;
      }
      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);
      if (!employee) {
        const error = new Error(`No employee found with id: ${req.params.id}`);
        throw error;
      }
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      // const { email, name, address } = req.body;
      if(req.role!="HR")
      {
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }
      const employee = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employee);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
 
    
      const savedEmployee = await this.employeeService.createEmployee(
        employee.email,
        employee.name,
        employee.address,
        employee.password,
        employee.role
      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };
  deleteEmployee = async (req: express.Request, res: express.Response) => {
    const employeeId = Number(req.params.id);
    await this.employeeService.deleteEmployee(employeeId);
    res.status(200).send();
  };
  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employee);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const id = parseInt(req.params.id);
      const curremployee = await this.employeeService.getEmployeeById(id);

      Object.assign(curremployee, req.body);
      const savedEmployee = await this.employeeService.updateEmployee(
        curremployee
      );
      res.status(200).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  };

  loginEmployee=async (req:Request,res:Response,next:NextFunction)=>{
    const {email, password} = req.body;
    try{

      const token = await this.employeeService.loginEmployee(email,password);
      res.status(200).send(token);
    }catch(error)
    {next(error)}

  }
}

export default EmployeeController;
