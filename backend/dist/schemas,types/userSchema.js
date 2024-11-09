"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInSchema = exports.userSignUpSchema = void 0;
const zod_1 = require("zod");
exports.userSignUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, { message: "Name cannot be empty" }),
    firstName: zod_1.z.string().min(1, { message: "First name cannot be empty" }),
    lastName: zod_1.z.string().min(1, { message: "Last name cannot be empty" }).optional(),
    email: zod_1.z.string().email({ message: "email format is invalid" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters" }),
});
exports.userSignInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "email format is invalid" }),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters" })
});
