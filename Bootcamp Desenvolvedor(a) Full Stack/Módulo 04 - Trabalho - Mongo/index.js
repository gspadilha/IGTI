import express from "express";

import { db } from "./models/index.js";

import accountsRouter from "./routes/accounts-route.js";

(async () => {
    try {
        await db.mongoose.connect(
            "mongodb://root:gspadilha@localhost:27017/accounts?retryWrites=true",
            {
                w: "majority",
                authSource: "admin",
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        console.log("Conectado no Mongoose");
    } catch (error) {
        console.log("Erro ao conectar no Mongoose " + error);
    }
})();

const app = express();

app.use(express.json());

app.use(accountsRouter);

app.listen(3000, () => {
    console.log("API Iniciada");
});
