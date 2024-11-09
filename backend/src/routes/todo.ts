import express from 'express';
const router = express.Router();
import userAuth from '../middleware/auth';
import { CustomRequest } from '../schemas,types/Codes';
import { addTodoSchema } from '../schemas,types/todoSchema';
import { ResponseStatus } from '../schemas,types/Codes';
import { PrismaClient } from '@prisma/client';

router.get('/', (req, res) => { 
    res.send('Todo route');
})

router.post('/createTodo', userAuth, async (req, res) => {
    const prisma = new PrismaClient();
    const userId = (req as CustomRequest).userId;
    const { title, description, importance, category,completed, duration, date } = req.body;
    const verify = addTodoSchema.safeParse({ title, description, importance, category,completed, duration, date });
    if (!verify) { 
        res.status(ResponseStatus.BadRequest).json({
            message: "Fill the fields Properly"
        });
        return;
    }
    try {
        const newTodo = await prisma.todo.create({
            data: {
               userId:Number(userId), title, description, importance, category, completed, duration, date
            }
        })
        res.status(ResponseStatus.Success).json({
            message:"Todo Created"
        })
        return;
    }
    catch (err) { 
        console.log("This is addTodo section error => ", err);
        res.send(ResponseStatus.InternalServerError).json({
            message: "Internal Server error"
        })
        
    }
    
    
})
export default router;