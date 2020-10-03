/*jshint node: true */
"use strict";

import BaseController from "./BaseController.js";
import Validators from "../plugins/validators.js";
import GradesModel from "../models/GradesModel.js";

const validator = new Validators();

class GradesController extends BaseController {
    static async insert(req, res, next) {
        const { student, subject, type, value } = req.body;

        validator.isRequired(student, "student: Campo Obrigatório");
        validator.isRequired(subject, "subject: Campo Obrigatório");
        validator.isRequired(type, "type: Campo Obrigatório");
        validator.isRequired(value, "value: Campo Obrigatório");
        validator.isNumber(value, "value: Deve ser um número");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.insert(req.body));
    }

    static async update(req, res) {
        let { id } = req.params;
        let { student, subject, type, value } = req.body;

        if (req.method === "PUT") {
            id = req.body.id;

            // é um PUT (enviou todos os dados no corpo)
            validator.isRequired(student, "student: Campo Obrigatório");
            validator.isRequired(subject, "subject: Campo Obrigatório");
            validator.isRequired(type, "type: Campo Obrigatório");
            validator.isRequired(value, "value: Campo Obrigatório");
            validator.isNumber(value, "value: Deve ser um número");
        }

        if (req.method !== "PUT" && req.body.student !== undefined) {
            validator.isRequired(student, "student: Campo Obrigatório");
        }

        if (req.method !== "PUT" && req.body.subject !== undefined) {
            validator.isRequired(subject, "subject: Campo Obrigatório");
        }

        if (req.method !== "PUT" && req.body.type !== undefined) {
            validator.isRequired(type, "type: Campo Obrigatório");
        }

        if (req.method !== "PUT" && req.body.value !== undefined) {
            validator.isRequired(value, "value: Campo Obrigatório");
            validator.isNumber(value, "value: Deve ser um número");
        }

        validator.isRequired(id, "id: Campo Obrigatório");
        validator.isNumber(id, "id: Deve ser um número");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.update(req.body));
    }

    static async delete(req, res) {
        const { id } = req.params;

        validator.isRequired(id, "id: Campo Obrigatório");
        validator.isNumber(id, "id: Deve ser um número");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.delete(req.params));
    }

    static async consulta(req, res) {
        const { id } = req.params;

        validator.isRequired(id, "id: Campo Obrigatório");
        validator.isNumber(id, "id: Deve ser um número");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.list(req.params));
    }

    static async consultaNota(req, res) {
        const { student, subject } = req.body;

        validator.isRequired(student, "student: Campo Obrigatório");
        validator.isRequired(subject, "subject: Campo Obrigatório");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.listConsultaNota(req.body));
    }

    static async consultaMedia(req, res) {
        const { type, subject } = req.body;

        validator.isRequired(type, "type: Campo Obrigatório");
        validator.isRequired(subject, "subject: Campo Obrigatório");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.listConsultaMedia(req.body));
    }

    static async consultaMelhores(req, res) {
        const { type, subject } = req.body;

        validator.isRequired(type, "type: Campo Obrigatório");
        validator.isRequired(subject, "subject: Campo Obrigatório");

        if (!validator.isValid()) {
            return BaseController.error(res, validator);
        }

        return BaseController.success(res, await GradesModel.listConsultaTresMelhores(req.body));
    }
}

export default GradesController;
