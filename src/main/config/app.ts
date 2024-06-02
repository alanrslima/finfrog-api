import { errorHandler } from "../middleware/error-handler";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

import express from "express";
import "express-async-errors";

const app = express();

setupMiddlewares(app);
setupRoutes(app);

app.use(errorHandler);

export default app;
