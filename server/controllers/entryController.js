import Entry from "../model/entry";
import {
    returnUserId
} from "../helpers/generateToken";

const entries = [];

class EntryController {
    static createEntry = (req, res) => {
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

        return res.status(200).send({
            status: 200,
            message: "entry created successfully",
            data: savedEntry
        })

    }

    static modifyEntry = (req, res) => {

    }

    static deleteEntry = (req, res) => {

    }

    static viewEntries = (req, res) => {

    }

    static viewEntry = (req, res) => {

    }
}

export default EntryController;