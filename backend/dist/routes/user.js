"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userSchema_1 = require("../schemas,types/userSchema");
router.get("/", (req, res) => {
    res.send("User route");
});
router.post("/signup", (req, res) => {
    const { username, firstName, lastName, password, email } = req.body;
    const resultParse = userSchema_1.userSignUpSchema.safeParse({ username, firstName, lastName, password, email });
    console.log(resultParse);
    console.log(resultParse.error);
    res.send("done");
});
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const resultParse = userSchema_1.userSignInSchema.safeParse({ email, password });
    console.log(resultParse);
    res.send("done");
});
exports.default = router;
