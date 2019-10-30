import express from "express";
import verifyToken from "../middleware/verifyToken";
import entryController from "../controllers/entryController";
import validateEntry from "../middleware/validateEntry";
import verifyParams from "../middleware/verifyParam";

const entryRouter = express.Router();

entryRouter.post('/entries', verifyToken, validateEntry, entryController.createEntry);
entryRouter.patch('/entries/:entryId', verifyParams, entryController.modifyEntry);
entryRouter.delete('/entries/:entryId', verifyParams, entryController.deleteEntry);
entryRouter.get('/entries', entryController.viewEntries);
entryRouter.get('/entries/:entryId', verifyParams, entryController.viewEntry)

export default entryRouter; 