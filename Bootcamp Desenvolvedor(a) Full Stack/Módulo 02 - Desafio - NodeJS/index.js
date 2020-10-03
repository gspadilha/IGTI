/*jshint node: true */
"use strict";

import express from "express";
import { promises as fs } from "fs";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import logger from "./src/configs/logger-config.js";
global.logger = logger;

import config from "./src/configs/server-config.js";
global.config = config;

import GradesRoute from "./src/routes/GradesRoute.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup());

app.get("/", (req, res) => {
    res.status(200).send({ message: "API Funcional" });
});

app.use("/grades", GradesRoute);

app.listen(3000, async () => {
    try {
        await fs.readFile(`./db/${config.dbFileName}`);
    } catch (err) {
        await fs.writeFile(`./db/${config.dbFileName}`, JSON.stringify(config.initDb, null, 4));
    }

    global.logger.info("API Iniciada");
});
