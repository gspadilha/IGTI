const moeda = (value) => {
    value = value === -0 ? 0 : value;
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

const percent = (value) => {
    value = value === -0 ? 0 : value;
    return `${value.toFixed(2).replace(".", ",")}%`;
};

export { moeda, percent };
