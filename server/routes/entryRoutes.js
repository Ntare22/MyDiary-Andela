import express from "express";
import verifyToken from "../middleware/verifyToken";
import entryController from "../controllers/entryController";
import validateEntry from "../middleware/validateEntry";
import validateParams from "../middleware/verifyParam";

const entryRouter = express.Router();

entryRouter.post('/entries', verifyToken, validateEntry, entryController.createEntry);
entryRouter.patch('/entries/:entryId', validateParams, verifyToken, entryController.modifyEntry);
entryRouter.delete('/entries/:entryId', validateParams, verifyToken, entryController.deleteEntry);
entryRouter.get('/entries', verifyToken, entryController.viewEntries);
entryRouter.get('/entries/:entryId', validateParams, verifyToken, entryController.viewEntry)

export default entryRouter; 