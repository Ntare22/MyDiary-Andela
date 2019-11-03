import { Pool } from 'pg';
import {
    returnUserId
} from "../helpers/generateToken";

const pool = new Pool({
    connectionString: process.env.dbURL
})

class EntryController {
    static createEntry = async (req, res) => {
        try {
            let {
                title,
                description
            } = req.body;

            const userId = returnUserId(req.header('authorization'));
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const dateCreated = `${day}/${month}/${year}`;

            const addEntry = `INSERT INTO mydiaryEntries(userid, title, description, dateCreated) VALUES ($1, $2, $3, $4) RETURNING *`;
            const entryValues = [
                userId,
                title,
                description,
                dateCreated
            ]

            const { rows } = await pool.query(addEntry, entryValues);

            return res.status(200).json({
                status: 200,
                message: "entry created successfully",
                data: rows[0]
            })
        } 
        catch(error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    } 

    static modifyEntry = (req, res) => {}

    static deleteEntry = (req, res) => {}

    static viewEntries = (req, res) => {}

    static viewEntry = (req, res) => {}
}
export default EntryController;