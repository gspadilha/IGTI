import Decimal from "@agrora/decimal";

const jurosCompostos = ({ valorDoMontante, taxaDeJuros, periodoEmMeses }) => {
    const taxaJuros = Decimal.from(taxaDeJuros).divide(100, 4).toFloat();
    const pow = Math.pow(Decimal.from(1).add(Decimal.from(taxaJuros), 4).toFloat(), parseInt(periodoEmMeses));
    let a = pow.toFixed(5);
    const montanteFinal = Decimal.from(valorDoMontante).multiply(a, 4);
    return montanteFinal;
};

const percentualEquivalente = ({ valorOriginal, valorComparado }) => {
    return parseInt(valorOriginal) === 0 ? 0 : Decimal.from(valorComparado).multiply(100, 4).divide(valorOriginal, 4).toFloat();
};

export { jurosCompostos, percentualEquivalente };
