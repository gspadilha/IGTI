const express = require('express');
const TransactionModel = require('../models/TransactionModel');
const transactionRouter = express.Router();

transactionRouter.get('/:period', async (request, response) => {
    const [year, month] = request.params.period.split('-');

    const monthParsed =
        parseInt(month).length === 1 ? `0${parseInt(month)}` : month;

    const registros = await TransactionModel.find({
        yearMonth: `${year}-${monthParsed}`,
    });

    const lancamentos = registros.length;

    const receitas = registros
        .filter((item) => item.type === '+')
        .reduce((acc, cur) => acc + cur.value, 0);

    const despesas = registros
        .filter((item) => item.type === '-')
        .reduce((acc, cur) => acc + cur.value, 0);

    return response.send({
        lancamentos,
        receitas,
        despesas,
        transactions: registros,
    });
});

transactionRouter.post('/', async (request, response) => {
    try {
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            type,
        } = request.body;

        const dayParsed =
            parseInt(day).length === 1 ? `0${parseInt(day)}` : day;
        const monthParsed =
            parseInt(month).length === 1 ? `0${parseInt(month)}` : month;

        const insertedAccount = await TransactionModel.create({
            description,
            value,
            category,
            year,
            month: monthParsed,
            day: dayParsed,
            yearMonth: `${year}-${monthParsed}`,
            yearMonthDay: `${year}-${monthParsed}-${dayParsed}`,
            type,
        });

        return response.status(201).send(insertedAccount);
    } catch (e) {
        return response.status(500).send(e);
    }
});

transactionRouter.delete('/:id', async (request, response) => {
    try {
        const accountsBefore = await TransactionModel.countDocuments();

        const _ = await TransactionModel.deleteOne({ _id: request.params.id });

        const accountsAfter = await TransactionModel.countDocuments();

        return response.status(200).send({
            antes: accountsBefore,
            depois: accountsAfter,
        });
    } catch (e) {
        console.log('e :>> ', e);
        return response.status(500).send(e);
    }
});

transactionRouter.put('/:id', async (request, response) => {
    try {
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            type,
        } = request.body;

        const dayParsed =
            parseInt(day).length === 1 ? `0${parseInt(day)}` : day;
        const monthParsed =
            parseInt(month).length === 1 ? `0${parseInt(month)}` : month;

        const updatedAccount = await TransactionModel.updateOne(
            {
                _id: request.params.id,
            },
            {
                $set: {
                    description,
                    value,
                    category,
                    year,
                    month: monthParsed,
                    day: dayParsed,
                    yearMonth: `${year}-${monthParsed}`,
                    yearMonthDay: `${year}-${monthParsed}-${dayParsed}`,
                    type,
                },
            }
        );
        console.log('updatedAccount :>> ', updatedAccount);
        return response.status(201).send(updatedAccount);
    } catch (e) {
        console.log('e :>> ', e);
        return response.status(500).send(e);
    }
});

module.exports = transactionRouter;
