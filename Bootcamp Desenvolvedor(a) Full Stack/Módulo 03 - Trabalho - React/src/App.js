import React, { Component } from 'react'

import Header from './Components/Header/Header'
import Input from './Components/Input/Input'
import ProgressBar from './Components/ProgressBar/ProgressBar'

import { calculateSalaryFrom } from './helpers/salary'
import { calcularProporcao } from './helpers/calcularPorporcao'
import { toCurrency } from './plugins/formatter'

class App extends Component {
  constructor() {
    super()

    this.state = {
      salarioBruto: '',
      baseINSS: '',
      descontoINSS: '',
      baseIRPF: '',
      descontoIRPF: '',
      salarioLiquido: '',
    }
  }

  handleInputOnChange = (salarioBrutoDigitado) => {
    const { baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary, } = calculateSalaryFrom(salarioBrutoDigitado);

    this.setState({
      salarioBruto: salarioBrutoDigitado,
      baseINSS: baseINSS,
      descontoINSS: discountINSS,
      baseIRPF: baseIRPF,
      descontoIRPF: discountIRPF,
      salarioLiquido: netSalary,
    })
  }

  render() {
    const { salarioBruto, baseINSS, descontoINSS, baseIRPF, descontoIRPF, salarioLiquido } = this.state;

    const { porcentagemINSS, porcetangemIRPF, porcentagemSalarioLiquido } = calcularProporcao({ descontoINSS, descontoIRPF, salarioLiquido });

    return (
      <section className='container' >
        <Header />

        <div className='row'>
          <Input id={'salarioBruto'}
            label={'Salário Bruto:'}
            type={'number'}
            value={salarioBruto}
            onChange={this.handleInputOnChange}
          />
        </div>

        <div className='row'>
          <Input id={'baseINSS'}
            label={'Base INSS:'}
            size={'l3 m6 s12'}
            value={toCurrency(baseINSS)}
          />

          <Input id={'descontoINSS'}
            label={'Desconto INSS:'}
            size={'l3 m6 s12'}
            value={`${toCurrency(descontoINSS)} (${porcentagemINSS}%)`}
          />

          <Input id={'baseIRPF'}
            label={'Base IRPF:'}
            size={'l3 m6 s12'}
            value={toCurrency(baseIRPF)}
          />

          <Input id={'descontoIRPF'}
            label={'Desconto IRPF:'}
            size={'l3 m6 s12'}
            value={`${toCurrency(descontoIRPF)} (${porcetangemIRPF}%)`}
          />
        </div>

        <div className='row'>
          <Input id={'salarioLiquido'}
            label={'Salário Líquido:'}
            value={`${toCurrency(salarioLiquido)} (${porcentagemSalarioLiquido}%)`}
          />
        </div>

        <div className='row'>
          <ProgressBar values={{ descontoINSS, descontoIRPF, salarioLiquido }} />
        </div>

      </section>
    );
  }
}

export default App