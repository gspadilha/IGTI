import { db } from "../models/index.js";

const accountsModel = db.accountsModel;

const TARIFA_SAQUE = 1;
const TARIFA_TRANSFERENCIA = 8;

const checkIfExist = async ({ agencia, conta }) => {
    const existingAccount = await accountsModel.findOne({
        agencia,
        conta,
    });

    return existingAccount === null || existingAccount.length === 0
        ? false
        : existingAccount;
};

const newAccount = async (request, response) => {
    try {
        const existingAccount = await checkIfExist(request.body);

        if (existingAccount === false) {
            const { agencia, conta, name, balance } = request.body;

            const insertedAccount = await accountsModel.create({
                agencia,
                conta,
                name,
                balance,
            });

            return response.status(201).send(insertedAccount);
        }
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá
receber como parâmetros a “agencia”, o número da “conta” e o valor do depósito.
Ele deverá atualizar o “balance” da conta, incrementando-o com o valor recebido
como parâmetro. O endpoint deverá validar se a conta informada existe, caso não
exista deverá retornar um erro, caso exista retornar o saldo atual da conta. */
const deposito = async (request, response) => {
    try {
        const existingAccount = await checkIfExist(request.body);

        if (existingAccount === false) {
            return response
                .status(404)
                .send({ message: "Conta não registrada" });
        }

        const { agencia, conta, balance } = request.body;

        const newBalance = existingAccount.balance + Number(balance);

        const _ = await accountsModel.updateOne(
            {
                agencia,
                conta,
            },
            { $set: { balance: newBalance } }
        );

        return response
            .status(200)
            .send({ agencia, conta, balance: newBalance });
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá
 receber como parâmetros a “agência”, o número da “conta” e o valor do saque. Ele
deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com
parâmetro e cobrando uma tarifa de saque de (1). O endpoint deverá validar se a
conta informada existe, caso não exista deverá retornar um erro, caso exista retornar
o saldo atual da conta. Também deverá validar se a conta possui saldo suficiente
para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que
o saque fique negativo. */
const saque = async (request, response) => {
    try {
        const existingAccount = await checkIfExist(request.body);

        if (existingAccount === false) {
            return response
                .status(404)
                .send({ message: "Conta não registrada" });
        }

        const { agencia, conta, balance } = request.body;

        if (existingAccount.balance < Number(balance) + TARIFA_SAQUE) {
            return response
                .status(200)
                .send({ message: "Conta não possui saldo suficiente" });
        }

        const newBalance =
            existingAccount.balance - Number(balance) - TARIFA_SAQUE;

        const _ = await accountsModel.updateOne(
            {
                agencia,
                conta,
            },
            { $set: { balance: newBalance } }
        );

        return response
            .status(200)
            .send({ agencia, conta, balance: newBalance });
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber
como parâmetro a “agência” e o número da “conta”, e deverá retornar seu “balance”.
Caso a conta informada não exista, retornar um erro. */
const extrato = async (request, response) => {
    try {
        const existingAccount = await checkIfExist(request.body);

        if (existingAccount === false) {
            return response
                .status(404)
                .send({ message: "Conta não registrada" });
        }

        return response.status(200).send(existingAccount);
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para excluir uma conta. Este endpoint deverá receber como
parâmetro a “agência” e o número da “conta” da conta e retornar o número de contas
ativas para esta agência. */
const remove = async (request, response) => {
    try {
        const existingAccount = await checkIfExist(request.body);

        if (existingAccount === false) {
            return response
                .status(404)
                .send({ message: "Conta não registrada" });
        }

        const accountsBefore = await accountsModel.countDocuments();

        const { agencia, conta } = request.body;

        const _ = await accountsModel.deleteOne({ agencia, conta });

        const accountsAfter = await accountsModel.countDocuments();

        return response.status(200).send({
            antes: accountsBefore,
            depois: accountsAfter,
        });
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/**Crie um endpoint para realizar transferências entre contas. Este endpoint deverá
receber como parâmetro o número da “conta” origem, o número da “conta” destino e
o valor de transferência. Este endpoint deve validar se as contas são da mesma
agência para realizar a transferência, caso seja de agências distintas o valor de tarifa
de transferencia (8) deve ser debitado na “conta” origem. O endpoint deverá retornar
o saldo da conta origem. */
const transferencia = async (request, response) => {
    try {
        const {
            agencia_origem,
            conta_origem,
            agencia_destino,
            conta_destino,
            balance,
        } = request.body;

        const existingOriginAccount = await checkIfExist({
            agencia: agencia_origem,
            conta: conta_origem,
        });

        const existingDestinyAccount = await checkIfExist({
            agencia: agencia_destino,
            conta: conta_destino,
        });

        if (
            existingOriginAccount === false ||
            existingDestinyAccount === false
        ) {
            return response
                .status(404)
                .send({ message: "Conta(s) não registrada(s)" });
        }
        let tarifa_transferencia = 0;
        if (agencia_origem !== agencia_destino) {
            tarifa_transferencia = TARIFA_TRANSFERENCIA;
        }

        if (
            existingOriginAccount.balance <
            Number(balance) + tarifa_transferencia
        ) {
            return response
                .status(200)
                .send({ message: "Conta não possui saldo suficiente" });
        }

        const newBalanceOrigin =
            existingOriginAccount.balance -
            Number(balance) -
            tarifa_transferencia;

        const newBalanceDestiny =
            existingDestinyAccount.balance + Number(balance);

        const a_ = await accountsModel.updateOne(
            {
                agencia: agencia_origem,
                conta: conta_origem,
            },
            { $set: { balance: newBalanceOrigin } }
        );

        const b_ = await accountsModel.updateOne(
            {
                agencia: agencia_destino,
                conta: conta_destino,
            },
            { $set: { balance: newBalanceDestiny } }
        );

        return response.status(200).send({
            destino: {
                agencia: agencia_destino,
                conta: conta_destino,
                balance: newBalanceDestiny,
            },
            origem: {
                agencia: agencia_origem,
                conta: conta_origem,
                balance: newBalanceOrigin,
            },
        });
    } catch (e) {
        console.log("e :>> ", e);
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para consultar a média do saldo dos clientes de determinada
agência.O endpoint deverá receber como parametro a “agência” e deverá retornar
o balance médio da conta. */
const media = async (request, response) => {
    try {
        const data = await accountsModel.aggregate([
            {
                $group: { _id: "$agencia", media: { $avg: "$balance" } },
            },
        ]);

        return response.status(200).send(data);
    } catch (e) {
        return response.status(500).send(e);
    }
};

const findAll = async (request, response) => {
    try {
        const data = await accountsModel.find();
        return response.status(200).send(data);
    } catch (e) {
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para consultar os clientes com o menor saldo em conta.O endpoint
devera receber como parâmetro um valor numérico para determinar a quantidade de
clientes a serem listados, e o endpoint deverá retornar em ordem crescente pelo
saldo a lista dos clientes(agência, conta, saldo).*/
const menor = async (request, response) => {
    try {
        const data = await accountsModel.find();

        const orderPorAgencia = data
            .sort((a, b) => Number(a.agencia) - Number(b.agencia))
            .sort((a, b) => {
                if (Number(a.agencia) !== Number(b.agencia)) {
                    return 0;
                }
                return Number(a.balance) - Number(b.balance);
            });
        console.log("orderPorAgencia :>> ", orderPorAgencia);
        return response.status(200).send(data);
    } catch (e) {
        return response.status(500).send(e);
    }
};

/** Crie um endpoint para consultar os clientes mais ricos do banco.O endpoint deverá
receber como parâmetro um valor numérico para determinar a quantidade de clientes
a serem listados, e o endpoint deverá retornar em ordem decrescente pelo saldo,
crescente pelo nome, a lista dos clientes(agência, conta, nome e saldo).*/
const maior = async (request, response) => {
    try {
        const data = await accountsModel.find();

        const orderPorAgencia = data
            .sort((a, b) => Number(a.agencia) - Number(b.agencia))
            .sort((a, b) => {
                if (Number(a.agencia) !== Number(b.agencia)) {
                    return 0;
                }
                return Number(b.balance) - Number(a.balance);
            });
        console.log("orderPorAgencia :>> ", orderPorAgencia);
        return response.status(200).send(data);
    } catch (e) {
        return response.status(500).send(e);
    }
};

/** Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada
agência para a agência private agencia = 99. O endpoint deverá retornar a lista dos
clientes da agencia private.*/
const filterBest = async (request, response) => {
    try {
        const data = await accountsModel.find();

        let a = "";

        const orderPorAgencia = data
            .sort((a, b) => Number(a.agencia) - Number(b.agencia))
            .sort((a, b) => {
                if (Number(a.agencia) !== Number(b.agencia)) {
                    return 0;
                }
                return Number(b.balance) - Number(a.balance);
            })
            .map((item) => {
                if (a !== item.agencia) {
                    a = item.agencia;
                    return item;
                }
                return null;
            })
            .filter((item) => item !== null);
        console.log("orderPorAgencia :>> ", orderPorAgencia);
        return response.status(200).send(data);
    } catch (e) {
        return response.status(500).send(e);
    }
};

export default {
    newAccount,
    deposito,
    saque,
    extrato,
    transferencia,
    remove,
    media,
    menor,
    maior,
    filterBest,
    findAll,
};
