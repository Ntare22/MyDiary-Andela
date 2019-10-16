import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id, email) => {
    const token = jwt.sign({
        userId: id,
        userEmail: email
    }, process.env.secretKey, {
        expiresIn: "1d"
    });
    return token;
}

export const returnUserId = (token) => {
    const currentToken = jwt.verify(token, process.env.secretKey);

    return currentToken.userId;
}