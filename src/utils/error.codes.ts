export const ErrorCodes = {
  INCORRECT_PASSWORD: {
    CODE: "INCORRECT_PASSWORD",
    MESSAGE: "Incorrect Password",
  },
  UNAUTHORIZED: {
    CODE: "UNAUTHORIZED",
    MESSAGE: "You are not authorized to perform this action",
  },
  EMPLOYEE_WITH_ID_NO_FOUND: {
    CODE: "EMPLOYEE_WITH_ID_NO_FOUND",
    MESSAGE: "Couldnt find the required employee",
  },
  NO_EMPLOYEES_FOUND: {
    CODE: "NO_EMPLOYEES_FOUND",
    MESSAGE: "No employees found",
  },
  DEPARTMENT_WITH_ID_NOT_FOUND: {
    CODE: "DEPARTMENT_WITH_ID_NOT_FOUND",
    MESSAGE: "Couldnt find the required department",
  },
  NO_DEPARTMENTS_FOUND: {
    CODE: "NO_DEPARTMENTS_FOUND",
    MESSAGE: "No departments found",
  },
};

export type CustomError = (typeof ErrorCodes)[keyof typeof ErrorCodes];
