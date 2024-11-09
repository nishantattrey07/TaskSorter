import express from 'express';
const router = express.Router();
import userAuth from '../middleware/auth';
import { CustomRequest } from '../schemas,types/Codes';
import { addTodoSchema,updateTodoSchema } from '../schemas,types/todoSchema';
import { ResponseStatus,Categories } from '../schemas,types/Codes';
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


router.post('/updateTodo', userAuth, async (req, res) => { 
    const prisma = new PrismaClient();
    const userId = (req as CustomRequest).userId;
    const { todoId,title, description, importance, category, completed, duration, date } = req.body;
    const verify = updateTodoSchema.safeParse({ title, description, importance, category, completed, duration, date });
    if (!verify) { 
        res.status(ResponseStatus.BadRequest).json({
            message: "Fill the fields Properly"
        });
        return;
    }
    try { 
        const updateTodo = await prisma.todo.update({
            where: {
                todoId:todoId
            },
            data: {
                title, description, importance, category, completed, duration, date
            }
        })
        res.status(ResponseStatus.Success).json({
            message:"Updated Task Successfully"
        })
        return;
    }
    catch (err) { 
        console.log("This is updateTodo section error => ", err);
        res.send(ResponseStatus.InternalServerError).json({
            message: "Internal Server error"
        })
        
    }
})

router.get('/getTodos', userAuth, async (req, res) => { 
    const prisma = new PrismaClient();
    const userId = (req as CustomRequest).userId;
    try { 
        const result = await prisma.todo.findMany({
            where: {
                userId:Number(userId)
            }

        })
        const todos=SortTodos({result})
        res.status(ResponseStatus.Success).json({
            todos
        })
        return;
        
    }
    catch (err) { 
        console.log("This is getTodos error => ", err);
        res.status(ResponseStatus.InternalServerError).json({
            message:"Internal Server error"
        })
        
    }

})


function SortTodos({ result }: { result: any[] }) {
    return result.sort((a, b) => {
        const aTotal:any = a.importance + Categories[a.category];
        const bTotal:any = b.importance + Categories[b.category];

        return bTotal - aTotal;
    });
}
export default router;