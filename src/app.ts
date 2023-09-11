// imports
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";

// setup environment
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "production"}` });

import { ConnectDB } from "./config/db";
import { mainRouter } from "./route";
import { ErrorHandler } from "./middleware/error";

// constants
const PORT = Number(process.env.PORT ?? 2002);
const DB_URI = process.env.DB_URI ?? "";
const START_TIME = (new Date()).toISOString();

// setup express
const app: express.Application = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup template engine and static dir
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../static")));

// server status
app.get("/status", (_req: express.Request, res: express.Response) =>
    res.send(`Server started on ${START_TIME}`)
);

// main application routes
app.use("/", mainRouter);

// error handler middleware
app.use(ErrorHandler);

// start express
const startServer = async () => {
    try {
        await ConnectDB(DB_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
            app.emit("ready");
        });
    } catch (error) {
        console.error("Server startup failed: ", error)
    }
};

startServer();

export { app };