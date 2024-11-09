import express, {Request,Response,NextFunction} from 'express';
import { ResponseStatus } from '../schemas,types/Codes';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../schemas,types/Codes';
import { config } from "dotenv";
config();



async function userAuth(req:CustomRequest, res: Response, next: NextFunction) {
    const prisma = new PrismaClient();
    const resToken = req.header('authorization');
    if (!resToken) { 
        res.status(ResponseStatus.BadRequest).json({ 
            message:"Invalid Credentials"
        });
        return;
    }
    const token = resToken.split(' ')[1];
    
    try { 
        if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
    }
        const userTok = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
        const response = await prisma.user.findFirst({
            where: {
                username: userTok.username
            }
        })
        if (!response) { 
            res.status(ResponseStatus.NotFound).json({
                message:"User not Found"
            })
        }
        req.userId = String(response?.userId);
        next();
        return;
        
    }
    catch (err) {
        console.log("This is the auth error => ", err);
        res.status(ResponseStatus.InternalServerError).json({
            message:"Could not authorize, Internal Server Error"
        })
        return;
    }


}


export default userAuth;