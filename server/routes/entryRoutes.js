import express from "express";
import verifyToken from "../middleware/verifyToken";
import entryController from "../controllers/entryController";
import validateEntry from "../middleware/validateEntry";

const entryRouter = express.Router();

entryRouter.post('/entries', verifyToken, validateEntry, entryController.createEntry);
entryRouter.patch('/entries/:entryId', entryController.modifyEntry); 

export default entryRouter;