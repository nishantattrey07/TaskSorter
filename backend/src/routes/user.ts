import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../schemas,types/Codes";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();


const prisma = new PrismaClient();

import { userSignUpSchema,userSignInSchema } from "../schemas,types/userSchema";
router.get("/", (req, res) => {
  res.send("User route");
});


router.post("/signup", async(req, res) => {
  const { username, firstName, lastName, password, email } = req.body;

  const resultParse = userSignUpSchema.safeParse({ username, firstName, lastName, password, email });

  if (!resultParse.success) {
    console.log(resultParse.error);
    res.status(ResponseStatus.BadRequest).json({
      message: "Invalid data"
     });
    return;
  }
  try {
    const response = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        password,
        email,
      },
      
    });
    console.log("this is response",response);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ username: response.username }, process.env.JWT_SECRET);
    res.status(ResponseStatus.Created).json({
      message: "User created successfully",
      token:token
    });
    return;
   }
  catch (error) {
    console.log(error);
    res.status(ResponseStatus.InternalServerError).json({
      message: "Something went wrong"
    })
  }
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const resultParse = userSignInSchema.safeParse({ email, password });
    console.log(resultParse);
    res.send("done");

})

export default router;