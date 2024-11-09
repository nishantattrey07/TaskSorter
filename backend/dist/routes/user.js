"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Codes_1 = require("../schemas,types/Codes");
const client_1 = require("@prisma/client");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const prisma = new client_1.PrismaClient();
const userSchema_1 = require("../schemas,types/userSchema");
router.get("/", (req, res) => {
    res.send("User route");
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstName, lastName, password, email } = req.body;
    const resultParse = userSchema_1.userSignUpSchema.safeParse({ username, firstName, lastName, password, email });
    if (!resultParse.success) {
        console.log(resultParse.error);
        res.status(Codes_1.ResponseStatus.BadRequest).json({
            message: "Invalid data"
        });
        return;
    }
    try {
        const response = yield prisma.user.create({
            data: {
                username,
                firstName,
                lastName,
                password,
                email,
            },
        });
        console.log("this is response", response);
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ username: username }, process.env.JWT_SECRET);
        res.status(Codes_1.ResponseStatus.Created).json({
            message: "User created successfully",
            token: token
        });
        console.log("this is token", token);
    }
    catch (error) {
        console.log(error);
        res.status(Codes_1.ResponseStatus.InternalServerError).json({
            message: "Something went wrong"
        });
    }
}));
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const resultParse = userSchema_1.userSignInSchema.safeParse({ email, password });
    console.log(resultParse);
    res.send("done");
});
exports.default = router;
