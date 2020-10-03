import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Form from "./components/Form";
import InputNumber from "./components/InputNumber";
import Section from "./components/Section";
import Card from "./components/Card";

import { moeda, percent } from "./plugins/formatacao";
import { jurosCompostos, percentualEquivalente } from "./helpers/calculos";

function App() {
    const [capitalInicial, setCapitalInicial] = useState(0);
    const [taxaDeJuros, setTaxaDeJuros] = useState(0.0);
    const [periodo, setPeriodo] = useState(1);
    const [parcelas, setParcelas] = useState([]);

    useEffect(() => {
        let parcelasCalculadas = [];
        for (let i = 0; i <= parseInt(periodo); i++) {
            const montanteFinal = jurosCompostos({ valorDoMontante: capitalInicial, taxaDeJuros, periodoEmMeses: i });
            const diferencaDoInicial = parseFloat(capitalInicial) - parseFloat(montanteFinal);
            const percentualDoInicial = percentualEquivalente({ valorOriginal: capitalInicial, valorComparado: diferencaDoInicial });
            parcelasCalculadas.push({ montanteFinal, diferencaDoInicial, percentualDoInicial });
        }
        setParcelas(parcelasCalculadas);
    }, [capitalInicial, taxaDeJuros, periodo]);

    const handleCapitalInicial = (event) => {
        if (event.target.value.trim() !== "") {
            setCapitalInicial(event.target.value);
        }
    };

    const handleTaxaDeJuros = (event) => {
        if (event.target.value.trim() !== "") {
            if (parseFloat(event.target.value) >= -12 && parseFloat(event.target.value) <= 12) {
                setTaxaDeJuros(event.target.value);
            }
        }
    };

    const handlePeriodo = (event) => {
        if (event.target.value.trim() !== "") {
            if (parseInt(event.target.value) >= 1 && parseInt(event.target.value) <= 36) {
                setPeriodo(event.target.value);
            }
        }
    };

    return (
        <div className='container'>
            <Header title='Juros Compostos' />

            <Form>
                <InputNumber id='inputCapitalInicial' label='Montante Inicial' value={capitalInicial} onChangeInput={handleCapitalInicial} />
                <InputNumber id='inputTaxaJuros' label='Taxa de Juros Mensal' value={taxaDeJuros} onChangeInput={handleTaxaDeJuros} step='0.1' />
                <InputNumber id='inputPeriodo' label='Período (meses)' value={periodo} onChangeInput={handlePeriodo} step='1' />
            </Form>

            <Section title='Parcelas'>
                {parcelas.map(({ montanteFinal, diferencaDoInicial, percentualDoInicial }, index) => {
                    let montante = moeda(montanteFinal);
                    let diferenca = moeda(-1 * diferencaDoInicial);
                    let percentual = percent(-1 * percentualDoInicial);
                    return index !== 0 && <Card key={index} index={index} montante={montante} diferenca={diferenca} percentual={percentual} />;
                })}
            </Section>
        </div>
    );
}

export default App;
