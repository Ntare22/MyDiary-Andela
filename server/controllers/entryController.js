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
        let {
            title,
            description
        } = req.body;

        const singleEntry = entries.find(e => e.entryId === parseInt(req.params.entryId));

        if (!singleEntry) {
            return res.status(400).send({
                status: 400,
                error: 'Entry entered is invalid'
            });
        }

        singleEntry.title = title;
        singleEntry.description = description;

        return res.status(200).send({
            status: 200,
            data: singleEntry
        })
    }

    static deleteEntry = (req, res) => {
        let {
            title,
            description
        } = req.body;

        const singleEntry = entries.find(e => e.entryId === parseInt(req.params.entryId));

        singleEntry.title = title;
        singleEntry.description = description;

        if (!singleEntry) {
            return res.status(404).send({
                status: 404,
                error: 'Entry entered not found'
            });
        }

        const index = entries.indexOf(singleEntry);
        console.log(index);
        entries.splice(index, 1);

        return res.status(200).send({
            status: 200,
            message: 'Entry has been deleted'
        });
    }

    static viewEntries = (req, res) => {

    }

    static viewEntry = (req, res) => {

    }
}

export default EntryController;