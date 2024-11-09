import express from "express";
const router = express.Router();
import { userSignUpSchema,userSignInSchema } from "../schemas,types/userSchema";
router.get("/", (req, res) => {
  res.send("User route");
});


router.post("/signup", (req, res) => {
    const { username, firstName, lastName, password, email } = req.body;
    
    const resultParse = userSignUpSchema.safeParse({ username, firstName, lastName, password, email });
    console.log(resultParse);
    console.log(resultParse.error);
    res.send("done")
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const resultParse = userSignInSchema.safeParse({ email, password });
    console.log(resultParse);
    res.send("done");

})

export default router;