/*jshint node: true */
"use strict";

import { promises as fs } from "fs";
import path from "path";

class GradesModel {
    constructor() {
        this.db = null;
    }

    static async lerNoDb() {
        try {
            return JSON.parse(await fs.readFile(`${path.resolve()}/db/grades.json`, "utf-8"));
        } catch (err) {
            return { res: false, message: err };
        }
    }

    static async escreverNoDb(grades) {
        try {
            return await fs.writeFile(`${path.resolve()}/db/grades.json`, JSON.stringify(grades, null, 4));
        } catch (err) {
            return { res: false, message: err };
        }
    }

    static async insert({ student, subject, type, value }) {
        this.db = await this.lerNoDb();

        const id = this.db.nextId++;
        const novoEstudante = { id, student, subject, type, value, timestamp: new Date() };

        this.db.nextId = this.db.nextId;
        this.db.grades.push(novoEstudante);

        try {
            let _ = await this.escreverNoDb(this.db);
            return { res: true, message: novoEstudante };
        } catch (err) {
            return { res: false, message: "Erro no insert: escrever db" };
        }
    }

    static async update({ id, student, subject, type, value }) {
        this.db = await this.lerNoDb();

        let encontrouRegistro = false;
        let estudantes = this.db.grades.map((estudante) => {
            if (parseInt(estudante.id) === parseInt(id)) {
                encontrouRegistro = true;
                return { id, student, subject, type, value, timestamp: new Date() };
            }
            return estudante;
        });

        if (!encontrouRegistro) {
            return { res: false, message: "Registro não encontrado" };
        }

        this.db.grades = estudantes;

        try {
            let _ = await this.escreverNoDb(this.db);
            return { res: true, message: "Registro atualizado com sucesso" };
        } catch (err) {
            return { res: false, message: "Erro no update: escrever db" };
        }
    }

    static async delete({ id }) {
        this.db = await this.lerNoDb();

        const estudantesRestantes = this.db.grades.filter((estudante) => {
            if (parseInt(estudante.id) !== parseInt(id)) {
                return estudante;
            }
        });

        this.db.grades = estudantesRestantes;

        try {
            let _ = await this.escreverNoDb(this.db);
            return { res: true, message: "Registro deletado com sucesso" };
        } catch (err) {
            return { res: false, message: "Erro no delete: escrever db" };
        }
    }

    static async list({ id }) {
        this.db = await this.lerNoDb();

        const estudanteAchado = this.db.grades.filter((estudante) => {
            if (parseInt(estudante.id) === parseInt(id)) {
                return estudante;
            }
        });

        return { res: estudanteAchado.length, message: estudanteAchado.length ? estudanteAchado : "Registro não encontrado" };
    }

    static async listConsultaNota({ student, subject }) {
        this.db = await this.lerNoDb();

        const soma = this.db.grades
            .filter((estudante) => {
                if (estudante.student.trim().toLowerCase() === student.trim().toLowerCase() && estudante.subject.trim().toLowerCase() === subject.trim().toLowerCase()) {
                    return estudante;
                }
            })
            .reduce((acc, cur) => acc + parseFloat(cur.value), 0);

        return { res: true, message: soma };
    }

    static async listConsultaMedia({ type, subject }) {
        this.db = await this.lerNoDb();

        const listagem = this.db.grades.filter((estudante) => {
            if (estudante.type.trim().toLowerCase() === type.trim().toLowerCase() && estudante.subject.trim().toLowerCase() === subject.trim().toLowerCase()) {
                return estudante;
            }
        });

        const media = listagem.reduce((acc, cur) => acc + parseFloat(cur.value), 0) / listagem.length;

        return { res: true, message: media };
    }

    static async listConsultaTresMelhores({ type, subject }) {
        this.db = await this.lerNoDb();

        const listagem = this.db.grades
            .filter((estudante) => {
                if (estudante.type.trim().toLowerCase() === type.trim().toLowerCase() && estudante.subject.trim().toLowerCase() === subject.trim().toLowerCase()) {
                    return estudante;
                }
            })
            .sort((primeiro, segundo) => parseFloat(segundo.value) - parseFloat(primeiro.value))
            .slice(0, 3);

        return { res: true, message: listagem };
    }
}

export default GradesModel;
