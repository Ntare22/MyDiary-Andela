import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const encryptPassword = (password) => bcrypt.hashSync(password, Number(process.env.pwdSalt));
export const decryptPassword = (password, enteredPwd) => bcrypt.compareSync(password, enteredPwd);