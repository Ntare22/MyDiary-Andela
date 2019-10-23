import express from "express";
import verifyToken from "../middleware/verifyToken";
import entryController from "../controllers/entryController";
import validateEntry from "../middleware/validateEntry";

const entryRouter = express.Router();

entryRouter.post('/entries', verifyToken, validateEntry, entryController.createEntry);
entryRouter.patch('/entries/:entryId', entryController.modifyEntry);
entryRouter.delete('/entries/:entryId', entryController.deleteEntry);
entryRouter.get('/entries', entryController.viewEntries);
entryRouter.get('/entries/:entryId', entryController.viewEntry)

export default entryRouter;