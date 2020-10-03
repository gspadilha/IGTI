import mongoose from "mongoose";

import accountsModel from "./accounts-model.js";

const db = {
    url: "localhost:27017",
    mongoose: mongoose,
    accountsModel: accountsModel(mongoose),
};

export { db };
