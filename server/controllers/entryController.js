import Entry from "../model/entry";
import {
    returnUserId
} from "../helpers/generateToken";

const entries = [];

class EntryController {
    static createEntry = (req, res) => {
        try {
            let {
                title,
                description
            } = req.body;

            const entryId = entries.length + 1;
            const userId = returnUserId(req.header('authorization'));
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const dateCreated = `${day}/${month}/${year}`;

            const savedEntry = new Entry(entryId, userId, title, description, dateCreated);
            entries.push(savedEntry);

            return res.status(200).json({
                status: 200,
                message: "entry created successfully",
                data: savedEntry
            })
        } 
        catch(error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    } 

    static modifyEntry = (req, res) => {
        try {
            let {
                title,
                description
            } = req.body;

            const singleEntry = entries.find(e => e.entryId === parseInt(req.params.entryId));

            if (!singleEntry) {
                return res.status(400).json({
                    status: 400,
                    error: 'Entry entered is invalid'
                });
            }

            singleEntry.title = title;
            singleEntry.description = description;

            return res.status(200).json({
                status: 200,
                data: singleEntry
            })
        } 
        catch(error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    }

    static deleteEntry = (req, res) => {
        try {
            let {
                title,
                description
            } = req.body;

            const singleEntry = entries.find(e => e.entryId === parseInt(req.params.entryId));

            singleEntry.title = title;
            singleEntry.description = description;

            if (!singleEntry) {
                return res.status(404).json({
                    status: 404,
                    error: 'Entry entered Not Available'
                });
            }

            const index = entries.indexOf(singleEntry);
            entries.splice(index, 1);

            return res.status(204).json({
                status: 204,
                message: 'Entry has been deleted'
            });
        }
        catch (error) {
            return res.status(404).json({
                status: 404,
                error: "Entry has been deleted"
            });
        }
    }

    static viewEntries = (req, res) => {
        try {
            return res.status(200).json({
                status: 200,
                data: entries
            })
        }
        catch (error) {
            return res.status(404).json({
                status: 404,
                error: error.message
            })
        }
    }

    static viewEntry = (req, res) => {
        try {
            const singleEntry = entries.find(e => e.entryId === parseInt(req.params.entryId));

            if (!singleEntry) {
                return res.status(404).json({
                    status: 404,
                    error: 'Entry has not been found'
                })
            }

            return res.status(200).json({
                status: 200,
                data: singleEntry
            })
        }
        catch (error) {
            return res.status(404).json({
                status: 404,
                error: error.message
            })
        }
        
    }
}

export default EntryController;