import { pool } from '../config/connect_db';
import {
    returnUserId
} from "../helpers/generateToken";


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

    static modifyEntry = async (req, res) => {
        try {
            let {
                title,
                description
            } = req.body;

            let {
                entryId
            } = req.params

            const findEntryId = `SELECT * FROM mydiaryEntries WHERE entryid = $1`;
            const { rows } = await pool.query(findEntryId, [entryId]);

            if (!rows[0]) {
                return res.status(400).send({
                    status: 400,
                    error: 'Entry entered does not exist'
                });
            }

            const updateEntry = `UPDATE mydiaryEntries SET title=$1, description=$2  WHERE entryid=$3 RETURNING *`;
            const entryUpdates = [
                title,
                description,
                entryId
            ]

            const updatedEntry = await pool.query(updateEntry, entryUpdates)

            return res.status(200).send({
                status: 200,
                data: updatedEntry.rows
            })
        }
        catch (error) {
            return res.status(400).json({
                status: 400,
                error: error.message
            });
        }
    }

    static deleteEntry = async (req, res) => {
        try {
            let {
                entryId
            } = req.params

            const findEntryId = `SELECT * FROM mydiaryEntries WHERE entryid = $1`;
            const { rows } = await pool.query(findEntryId, [entryId]);

            if (!rows[0]) {
                return res.status(400).send({
                    status: 400,
                    error: 'Entry entered is invalid'
                });
            }
            const deleteQuery = `DELETE FROM mydiaryEntries WHERE entryid = $1 RETURNING *`;

            const removeEntry = await pool.query(deleteQuery, [entryId]);
            
            return res.status(204).json({
                status: 204,
                data: removeEntry.rows
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
        
    }

    static viewEntries = async (req, res) => {
        try {
            const viewUser = returnUserId(req.header('authorization'));
        
            const getEntries = `SELECT * FROM mydiaryentries WHERE userid=$1;`;
            const { rows } = await pool.query(getEntries, [viewUser]);

            return res.status(200).json({
                status: 200,
                data: rows
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    }

    static viewEntry = async (req, res) => {
        try {
            let {
                entryId
            } = req.params
            
            const parsedEntryId = parseInt(entryId);
            const retrieveUserId = returnUserId(req.header('authorization'));

            const values = [ parsedEntryId, retrieveUserId ]

            const getEntriesQuery = `SELECT * FROM mydiaryentries WHERE entryid=$1 AND userid=$2;`;
            const getUserEntries = await pool.query(getEntriesQuery, values);

            if (getUserEntries.rows) {
                return res.status(200).json({
                    status: 200,
                    data: getUserEntries.rows
                })
            }
            return res.status(404).send({
                status: 404,
                error: 'Entry entered is not available'
            });
           
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }

    }
}
export default EntryController;