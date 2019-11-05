import {
    returnUserId
} from "../helpers/generateToken";
import { pool } from '../config/connect_db';

const verifyToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('authorization');
        if (!authorizationHeader) {
            return res.status(400).send({
                status: 400,
                error: "token is unavailable"
            })
        }


        const ourUser = returnUserId(authorizationHeader);
        const authUser = `SELECT * FROM mydiaryUsers WHERE id = $1`;
        const { rows } = await pool.query(authUser, [ourUser]);

        if (!rows[0]) {
            return res.status(401).send({
                status: 401,
                error: "not authorized to do the task"
            })
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        })
    }
}

export default verifyToken;