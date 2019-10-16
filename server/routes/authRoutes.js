import express from "express";
import validateUser from "../middleware/userValidate";
import UserController from "../controllers/userController";

const authRouter = express.Router();

authRouter.post('/signup', validateUser, UserController.signUp);

export default authRouter;