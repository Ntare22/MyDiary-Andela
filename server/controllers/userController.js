import User from "../model/user";
import {
    generateToken
} from "../helpers/generateToken";

import {
    encryptPassword,
    decryptPassword
} from "../helpers/securePwd";

export const users = [];

class UserController {
    static signUp = (req, res) => {
        const id = users.length + 1;
        let {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const usedEmail = users.find((user) => user.email === email);
        if (usedEmail) {
            return res.status(409).send({
                status: 409,
                error: `${email} is already in use`
            });
        }
        password = encryptPassword(password);

        const saveUser = new User(id, firstName, lastName, email, password);
        users.push(saveUser);

        const userToken = generateToken(id, email);

        return res.status(201).send({
            status: 201,
            message: 'User created successfully',
            token: userToken
        })
    }

    static signIn = (req, res) => {
        let {
            email,
            password
        } = req.body;

        const registeredUser = users.find((user) => user.email === email);

        if (registeredUser && (decryptPassword(password, registeredUser.password))) {
            const userToken = generateToken(email, password);
            return res.status(201).send({
                status: 201,
                token: userToken
            });
        } else {
            return res.status(409).send({
                status: 409,
                error: `${email} or password is incorrect`
            });
        }
    }
}

export default UserController;