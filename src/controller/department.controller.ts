import express, { NextFunction, Request, Response } from "express";
import DepartmentService from "../service/department.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { DepartmentDto } from "../dto/createDepartment.dto";
import HttpException from "../excpetion/http.exception";
import IncorrectPasswordException from "../excpetion/incorrectPasswordException";
import authorize from "../middleware/authorize.middleware";
import { ErrorCodes } from "../utils/error.codes";
import { RequestWithUser } from "../utils/requestWithUser";
import EntityNotFoundException from "../excpetion/enitityNotFoundExcpetion";

class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", this.getAllDepartments);
    this.router.get("/:id", this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.put("/:id", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }

  getAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departments = await this.departmentService.getAllDepartments();
      if (departments.length == 0) {
        throw new EntityNotFoundException(ErrorCodes.NO_DEPARTMENTS_FOUND);
      }
      res.status(200).send(departments);
    } catch (error) {
      next(error);
    }
  };

  getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(
        departmentId
      );
      if (!department) {
        throw new EntityNotFoundException(
          ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
        );
      }
      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      if (req.role != "HR") {
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }
      const department = plainToInstance(DepartmentDto, req.body);
      const errors = await validate(department);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const savedDepartment = await this.departmentService.createDepartment(
        department.name
      );
      res.status(200).send(savedDepartment);
    } catch (error) {
      next(error);
    }
  };
  deleteDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role != "HR") {
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.deleteDepartment(
        departmentId
      );
      if (!department) {
        throw new EntityNotFoundException(
          ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
        );
      }

      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };
  updateDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role != "HR") {
        throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
      }
      const department = plainToInstance(DepartmentDto, req.body);
      const errors = await validate(department);

      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const id = parseInt(req.params.id);
      const currdepartment = await this.departmentService.getDepartmentById(id);
      if (!currdepartment) {
        throw new EntityNotFoundException(
          ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
        );
      }
      Object.assign(currdepartment, req.body);
      const savedDepartment = await this.departmentService.updateDepartment(
        currdepartment
      );
      res.status(200).send(savedDepartment);
    } catch (error) {
      next(error);
    }
  };
}

export default DepartmentController;
