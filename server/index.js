import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes";
import entryRouter from "./routes/entryRoutes";

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', entryRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;