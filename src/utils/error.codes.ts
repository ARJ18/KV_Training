export const ErrorCodes= {
    INCORRECT_PASSWORD:{
        CODE:"INCORRECT_PASSWORD",
        MESSAGE:"Incorrect Password"
    },
    UNAUTHORIZED:{
        CODE:"UNAUTHORIZED",
        MESSAGE:"You are not authorized to perform this action"
    },
    EMPLOYEE_WITH_ID_NO_FOUND:{
        CODE:"EMPLOYEE_WITH_ID_NO_FOUND",
        MESSAGE:"Couldnt find the required employee"
    },
}

export type CustomError = typeof ErrorCodes[keyof typeof ErrorCodes];