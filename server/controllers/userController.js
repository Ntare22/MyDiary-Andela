import { Pool } from 'pg'

import {
    generateToken
} from "../helpers/generateToken";

import {
    encryptPassword,
    decryptPassword
} from "../helpers/securePwd";
// import DBTransaction from "../config/connect_db"


const pool = new Pool({
    connectionString: process.env.dbURL
})

class UserController {
    static signUp = async (req, res) => {
        // DBTransaction.db_connect();
        try {
            let {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            
            password = encryptPassword(password);

            const createUser = `INSERT INTO mydiaryUsers(firstName, lastName, email, password) VALUES ($1,$2,$3,$4) returning *`
            const values = [
                firstName,
                lastName,
                email,
                password
            ]
            
            const { rows } = await pool.query(createUser, values);

            const userToken = generateToken(rows[0].id, rows[0].email);

            return res.status(201).json({
                status: 201,
                message: 'User created successfully',
                token: userToken
            })
        }
        catch (error) {
            if(error.routine === '_bt_check_unique'){
                return res.status(409).send({'status': 409, 'error': 'User with this email already exists' })
            }
            return res.status(500).send(error.message);
        }

    }

    static signIn = (req, res) => {}
}

export default UserController;