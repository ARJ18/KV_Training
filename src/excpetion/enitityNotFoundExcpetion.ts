import HttpException from "./http.exception";
import { CustomError } from "../utils/error.codes";

class EntityNotFoundException extends HttpException{
    constructor(error:CustomError){
        super(404,error.MESSAGE);
    }
}

export default EntityNotFoundException;