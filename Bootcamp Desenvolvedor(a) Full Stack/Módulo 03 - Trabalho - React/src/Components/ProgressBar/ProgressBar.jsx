import React, { Component } from 'react'

import { calcularProporcao } from '../../helpers/calcularPorporcao'

import css from './progress-bar.module.css'

export default class ProgressBar extends Component {
    render() {
        const { porcentagemINSS, porcetangemIRPF, porcentagemSalarioLiquido } = calcularProporcao(this.props.values);

        return (
            <div className={css.defaultPrincipal}>
                <div className={css.default} style={{ width: `${porcentagemINSS}%` }}>&nbsp;</div>
                <div className={css.default} style={{ width: `${porcetangemIRPF}%` }}>&nbsp;</div>
                <div className={css.default} style={{ width: `${porcentagemSalarioLiquido}%` }}>&nbsp;</div>
            </div>
        )
    }
}
