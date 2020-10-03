function calcularProporcao(values) {
    const { descontoINSS, descontoIRPF, salarioLiquido } = values

    const porcentagemINSS = (descontoINSS * 100) / salarioLiquido
    const porcetangemIRPF = (descontoIRPF * 100) / salarioLiquido
    const salarioLiquidoFinal = 100 - porcentagemINSS.toFixed(2) - porcetangemIRPF.toFixed(2)

    return {
        porcentagemINSS: isNaN(porcentagemINSS) ? 0 : porcentagemINSS.toFixed(2),
        porcetangemIRPF: isNaN(porcetangemIRPF) ? 0 : porcetangemIRPF.toFixed(2),
        porcentagemSalarioLiquido: isNaN(salarioLiquidoFinal) ? 0 : salarioLiquidoFinal.toFixed(2),
    }
}

export { calcularProporcao }