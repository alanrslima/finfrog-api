import { UserCreatedNodeEvent } from "../../infra/event/user-created-node-event";
import { errorHandler } from "../middleware/error-handler";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

import express from "express";
import "express-async-errors";

const app = express();

setupMiddlewares(app);
setupRoutes(app);

app.use(errorHandler);

// Listeners
const userCreatedEvent = new UserCreatedNodeEvent();
userCreatedEvent.on((user) => console.log("USER CREATED", user));

export default app;
