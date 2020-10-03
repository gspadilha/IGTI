import { promises as fs } from "fs";

let estados = [];
let cidades = [];
let tamanhoNomeDeCidadePorEstadoMaior = [];
let tamanhoNomeDeCidadePorEstadoMenor = [];
let tamanhoNomeDeCidadeDeTodosEstadoMaior = [];
let tamanhoNomeDeCidadeDeTodosEstadoMenor = [];
let contaCidadesPorCadaEstado = [];

async function lerArquivo({ nomeArquivo }) {
    try {
        const data = await fs.readFile(`./cidades-estados-brasil-json/${nomeArquivo}`, "utf-8");
        const json = await JSON.parse(data);
        return json;
    } catch (err) {
        console.log("lerArquivo", err);
    }
}

async function init() {
    try {
        estados = await lerArquivo({ nomeArquivo: "Estados.json" });
        cidades = await lerArquivo({ nomeArquivo: "Cidades.json" });

        criarDiretorioDosEstados();

        let estadosComCidades = await criarArquivosPorEstado({ estados, cidades });
        estadosComCidades.sort((a, b) => parseInt(a.cidades.length) - parseInt(b.cidades.length)).forEach((estado) => console.log(`O estado do ${estado.estado.Nome} (${estado.estado.Sigla}) tem ${estado.cidades.length} cidades`));

        console.log(
            "Quantidade dos cinco maiores estados :>> ",
            estadosComCidades
                .sort((a, b) => parseInt(b.cidades.length) - parseInt(a.cidades.length))
                .filter((estado, i) => i <= 4)
                .reduce((acc, cur) => acc + cur.cidades.length, 0)
        );

        console.log(
            "Quantidade dos cinco meonores estados :>> ",
            estadosComCidades
                .sort((a, b) => parseInt(a.cidades.length) - parseInt(b.cidades.length))
                .filter((estado, i) => i <= 4)
                .reduce((acc, cur) => acc + cur.cidades.length, 0)
        );

        tamanhoNomeDeCidadePorEstado({ estadosComCidades, maiorOuMenor: "menor" });
        tamanhoNomeDeCidadePorEstado({ estadosComCidades, maiorOuMenor: "maior" });

        tamanhoNomeDeCidadeDeTodosEstado({ estadosComCidades, maiorOuMenor: "menor" });
        tamanhoNomeDeCidadeDeTodosEstado({ estadosComCidades, maiorOuMenor: "maior" });
    } catch (err) {
        console.log("err :>> ", err);
    }
}

function criarDiretorioDosEstados() {
    try {
        //   fs.mkdir('estados');
    } catch (error) {}
}

async function criarArquivosPorEstado({ estados, cidades }) {
    let todosEstados = [];
    let arrayEstados = Array.from(estados);
    let arrayCidades = Array.from(cidades);

    const promises = arrayEstados.map(async (estado) => {
        try {
            const objCidades = { cidades: [] };

            arrayCidades.forEach((cidade) => {
                if (parseInt(cidade.Estado) === parseInt(estado.ID)) {
                    objCidades.cidades.push(cidade);
                }
            });

            let objCidadesOrdenadas = objCidades.cidades.sort((a, b) => a.Nome.localeCompare(b.Nome));
            let _ = await fs.writeFile(`estados/${estado.Sigla.toUpperCase()}.json`, JSON.stringify(objCidadesOrdenadas, null, 4));

            todosEstados.push({ estado: estado, cidades: objCidadesOrdenadas });
        } catch (err) {
            console.log("err :>> ", err);
        }
    });

    await Promise.all(promises);
    return todosEstados;
}

function tamanhoNomeDeCidadePorEstado({ estadosComCidades, maiorOuMenor }) {
    estadosComCidades.forEach((estado) => {
        const total = [];

        estado.cidades.forEach((cidade) => {
            total.push(cidade.Nome);
        });

        if (maiorOuMenor === "maior") {
            total.sort((a, b) => parseInt(b.length) - parseInt(a.length));
            console.log(`A maior cidade do estado ${estado.estado.Sigla} tem o nome ${total[0]} com ${total[0].length} letras!`);
        } else {
            total.sort((a, b) => parseInt(a.length) - parseInt(b.length));
            console.log(`A menor cidade do estado ${estado.estado.Sigla} tem o nome ${total[0]} com ${total[0].length} letras!`);
        }
    });
}

function tamanhoNomeDeCidadeDeTodosEstado({ estadosComCidades, maiorOuMenor }) {
    let totais = [];

    estadosComCidades.forEach((estado) => {
        const total = [];

        estado.cidades.forEach((cidade) => {
            total.push({
                cidade: cidade.Nome,
                estado: estado.estado.Sigla,
            });
        });

        if (maiorOuMenor === "maior") {
            total.sort((a, b) => parseInt(b.cidade.length) - parseInt(a.cidade.length));
            totais.push(total[0]);
        } else {
            total.sort((a, b) => parseInt(a.cidade.length) - parseInt(b.cidade.length));
            totais.push(total[0]);
        }
    });

    totais = totais.sort((a, b) => a.cidade.localeCompare(b.cidade));

    if (maiorOuMenor === "maior") {
        totais.sort((a, b) => parseInt(b.cidade.length) - parseInt(a.cidade.length));
        console.log(`O maior nome de cidade é ${totais[0].cidade} com ${totais[0].cidade.length} letras do estado ${totais[0].estado}`);
    } else {
        totais.sort((a, b) => parseInt(a.cidade.length) - parseInt(b.cidade.length));
        console.log(`O menor nome de cidade é ${totais[0].cidade} com ${totais[0].cidade.length} letras do estado ${totais[0].estado}`);
    }
}

init();
