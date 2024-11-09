import { z } from 'zod';

export const addTodoSchema = z.object({
    title: z.string().min(1, { message: "Fill the title of the Task" }),
    description: z.string().min(1).optional(),
    importance: z.number().min(1).max(10),
    category: z.enum(['urgent', 'important', 'nicetohave']),
    completed:z.boolean(),
    duration: z.string().optional(),
    date:z.date().optional()
})


