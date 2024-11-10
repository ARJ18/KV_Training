import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
import { RequestWithUser } from "../utils/requestWithUser";
import { Response,NextFunction } from "express";

const authorize = async (req:RequestWithUser,res:Response,next:NextFunction)=>{
    try{const token = getTokenRequestFromHeadeR(req);
    const payload = jsonwebtoken.verify(token,JWT_SECRET);

    req.name = (payload as jwtPayload).name;
    req.email = (payload as jwtPayload).email;
    req.role = (payload as jwtPayload).role;

    return next();}
    catch(error)
    {
        next(error);
    }

    }
    const getTokenRequestFromHeadeR = (req:RequestWithUser)=>{
        const bearerToken = req.header("Authorization");
        const token = bearerToken ? bearerToken.replace("Bearer ",""):"";
        return token
        
    }
    export default authorize;