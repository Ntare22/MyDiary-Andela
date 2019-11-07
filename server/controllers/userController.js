import { pool } from '../config/connect_db';
import {
    generateToken
} from "../helpers/generateToken";
import {
    encryptPassword,
    decryptPassword
} from "../helpers/securePwd";
import uuid from 'uuid';

class UserController {
    static signUp = async (req, res) => {
        try {
            let {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const id = uuid.v1();
            const userPassword = encryptPassword(password);

            const createUser = `INSERT INTO mydiaryUsers(id, firstName, lastName, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING *`
            const values = [
                id,
                firstName,
                lastName,
                email,
                userPassword
            ]

            const { rows } = await pool.query(createUser, values);

            const userToken = generateToken(rows[0].id, rows[0].email);

            return res.status(201).json({
                status: 201,
                message: 'User created successfully',
                firstName: firstName,
                lastName: lastName,
                email: email,
                token: userToken
            })
        }
        catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(409).json({ status: 409, error: 'User with this email already exists' })
            }
            return res.status(500).send(error.message);
        }

    }

    static signIn = async (req, res) => {
        try {
            let { email, password } = req.body

            const findUser = `SELECT * from mydiaryusers where email = $1;`

            const { rows } = await pool.query(findUser, [email]);

            if (!rows.length) {
                return res.status(401).json({ status: 401, error: 'incorrect email or password' })
            }
            if (decryptPassword(password, rows[0].password)) {
                const userToken = generateToken(rows[0].id, rows[0].email)
                return res.status(200).json({ 
                    status: 200,
                    emial: email, 
                    message: 'user logged in successfully', 
                    token: userToken 
                });
            }
            return res.status(401).json({ status: 401, error: 'incorrect email or password' })
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

export default UserController;