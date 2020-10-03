function toCurrency(value) {
    return new Intl.NumberFormat(
        'pt-BR',
        { style: 'currency', currency: 'BRL' }
    ).format(value);
}

export { toCurrency }