import express from "express";

import accountsController from "../controllers/accounts-controller.js";

const route = express.Router();

route.post("/accounts/newAccount", accountsController.newAccount);
route.post("/accounts/deposito", accountsController.deposito);
route.post("/accounts/saque", accountsController.saque);
route.post("/accounts/transferencia", accountsController.transferencia);

route.get("/accounts/extrato", accountsController.extrato);
route.get("/accounts/media", accountsController.media);
route.get("/accounts/menor", accountsController.menor);
route.get("/accounts/maior", accountsController.maior);
route.get("/accounts/filterBest", accountsController.filterBest);
route.get("/accounts", accountsController.findAll);

route.delete("/accounts", accountsController.remove);

route.get("/accounts/:id", () => {});
route.put("/accounts/:id", () => {});

export default route;
