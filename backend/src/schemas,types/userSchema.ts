import { z } from 'zod';
export const userSignUpSchema = z.object({
    username: z.string().min(3, { message: "Name cannot be empty" }),
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }).optional(),
    email: z.string().email({ message: "email format is invalid" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export const userSignInSchema = z.object({
    email: z.string().email({ message: "email format is invalid" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
})
