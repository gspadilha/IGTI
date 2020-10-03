import React, { useState } from 'react';

import api from './service/api.js';

const App = () => {
    const [inputAno, setInputAno] = useState(0);
    const [inputMes, setInputMes] = useState(0);
    const [dados, setDados] = useState({});
    const [transactions, setTransactions] = useState([]);

    const [inputDiaTransacao, setInputDiaTransacao] = useState('');
    const [inputMesTransacao, setInputMesTransacao] = useState('');
    const [inputAnoTransacao, setInputAnoTransacao] = useState('');
    const [inputDescricaoTransacao, setInputDescricaoTransacao] = useState('');
    const [inputValueTransacao, setInputValueTransacao] = useState('');
    const [inputCategoriaTransacao, setInputCategoriaTransacao] = useState('');
    const [inputTipoTransacao, setInputTipoTransacao] = useState('');
    const [inputIdTransacao, setInputIdTransacao] = useState('');

    const busca = async (inputAno, inputMes) => {
        const response = await api.get(`/${inputAno}-${inputMes}`);
        const { lancamentos, receitas, despesas, transactions } = response.data;
        setDados({ lancamentos, receitas, despesas });
        setTransactions(transactions);
    };

    const handleClick = async () => {
        console.log('inputAno :>> ', inputAno);
        busca(inputAno, inputMes);
    };

    const handleEdit = async ({
        description,
        value,
        category,
        year,
        month,
        day,
        type,
        _id,
    }) => {
        setInputDiaTransacao(day);
        setInputMesTransacao(month);
        setInputAnoTransacao(year);
        setInputDescricaoTransacao(description);
        setInputTipoTransacao(type);
        setInputValueTransacao(value);
        setInputCategoriaTransacao(category);
        setInputIdTransacao(_id);
    };

    const salvarEdit = async () => {
        if (inputIdTransacao === '') {
            const response = await api.post(`/`, {
                description: inputDescricaoTransacao,
                value: inputValueTransacao,
                category: inputCategoriaTransacao,
                year: inputAnoTransacao,
                month: inputMesTransacao,
                day: inputDiaTransacao,
                type: inputTipoTransacao,
            });
            if (response.status === 201) {
                setInputAno(inputAnoTransacao);
                setInputMes(inputMesTransacao);
                busca(inputAnoTransacao, inputMesTransacao);
            }
        } else {
            const response = await api.put(`/${inputIdTransacao}`, {
                description: inputDescricaoTransacao,
                value: inputValueTransacao,
                category: inputCategoriaTransacao,
                year: inputAnoTransacao,
                month: inputMesTransacao,
                day: inputDiaTransacao,
                type: inputTipoTransacao,
            });
            if (response.status === 201) {
                setInputAno(inputAnoTransacao);
                setInputMes(inputMesTransacao);
                busca(inputAno, inputMes);
            }
        }
    };

    const handleDelete = async (id) => {
        const response = await api.delete(`/${id}`);
        if (response.status === 200) {
            busca(inputAno, inputMes);
        }
    };

    const filtrarDescricao = (event) => {
        const transactionsFiltradas = transactions.filter((transaction) =>
            transaction.description
                .toLowerCase()
                .includes(event.target.value.toLocaleLowerCase())
        );

        setTransactions(transactionsFiltradas);
    };

    return (
        <>
            <h1>Desafio Final</h1>
            <h2>Controle Financeiro Pessoal</h2>
            <input
                style={{ width: '50px' }}
                type='number'
                id='ano'
                onChange={(event) => setInputAno(event.target.value)}
            />
            <span style={{ display: 'inline-block', width: '50px' }}></span>
            <input
                style={{ width: '50px' }}
                type='number'
                id='mes'
                onChange={(event) => setInputMes(event.target.value)}
            />
            <div></div>
            <input
                style={{ width: '150px' }}
                type='text'
                id='filtro'
                onChange={filtrarDescricao}
            />
            <div></div>
            <button onClick={handleClick}>BUSCAR</button>
            <div style={{ height: '25px' }}></div>
            <div>
                <div>
                    ID:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='_id'
                        value={inputIdTransacao}
                        onChange={(event) => {
                            setInputIdTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Dia:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='dia'
                        value={inputDiaTransacao}
                        onChange={(event) => {
                            setInputDiaTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Mês:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='mes'
                        value={inputMesTransacao}
                        onChange={(event) => {
                            setInputMesTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Ano:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='ano'
                        value={inputAnoTransacao}
                        onChange={(event) => {
                            setInputAnoTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Descrição:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='descricao'
                        value={inputDescricaoTransacao}
                        onChange={(event) => {
                            setInputDescricaoTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Valor:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='value'
                        value={inputValueTransacao}
                        onChange={(event) => {
                            setInputValueTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Categoria:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='categorya'
                        value={inputCategoriaTransacao}
                        onChange={(event) => {
                            setInputCategoriaTransacao(event.target.value);
                        }}
                    />
                </div>
                <div>
                    Tipo:
                    <input
                        style={{ width: '150px' }}
                        type='text'
                        id='valor'
                        value={inputTipoTransacao}
                        onChange={(event) => {
                            setInputTipoTransacao(event.target.value);
                        }}
                    />
                </div>
            </div>
            <button onClick={salvarEdit}>Salvar</button>
            <div>
                <div>Lançamentos: {dados.lancamentos}</div>
                <div>Receitas: {dados.receitas}</div>
                <div>Despesas: {dados.despesas}</div>
                <div>Saldo: {dados.receitas - dados.despesas}</div>
            </div>
            <div style={{ height: '25px' }}></div>
            {transactions &&
                transactions.map((transaction, index) => {
                    return (
                        <div
                            className={`transacao ${
                                transaction.type === '+' ? 'type-0' : 'type-1'
                            }`}
                            key={index}
                        >
                            <div className='transacao_day'>
                                {transaction.day}
                            </div>
                            <div className='descricao'>
                                <div>
                                    <strong>{transaction.category}</strong>
                                </div>
                                <div>{transaction.description}</div>
                            </div>
                            <div>
                                <strong>{transaction.value}</strong>
                            </div>
                            <button onClick={() => handleEdit(transaction)}>
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(transaction._id)}
                            >
                                Deletar
                            </button>
                        </div>
                    );
                })}
        </>
    );
};

export default App;
