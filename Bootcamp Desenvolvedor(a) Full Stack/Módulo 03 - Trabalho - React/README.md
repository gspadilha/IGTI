# Bootcamp: Desenvolvimento Full Stack

## Trabalho Prático - Módulo 3 - FrontEnd com React

### Objetivos

Exercitar os seguintes conceitos trabalhados no Módulo:

1. Implementação de aplicações com JavaScript e React.

1. Criação de Class Components.

### Enunciado
Construa, utilizando React, uma aplicação para calcular o salário líquido a partir do salário bruto, considerando as regras da CLT de 2020.

### Atividades

Os alunos deverão desempenhar as seguintes atividades:

1. Implementar, utilizando React, uma aplicação denominada “react-salario” que possuirá um input editável e diversos outros inputs somente-leitura, para exibir informações sobre o cálculo de salário conforme as leis da CLT em 2020. Só devem ser considerados os cálculos de desconto de INSS e IRPF, ou seja, outros descontos e dependentes devem ser ignorados. Os valores a serem exibidos são:

- Salário bruto (editável pelo usuário).
- Base INSS (somente-leitura).
- Desconto INSS (somente-leitura).
- Base IRPF (somente-leitura).
- Desconto IRPF (somente-leitura).
- Salário líquido (somente-leitura)

2. O site de referência para regras de cálculo e comparação de valores calculados, deve ser o: https://www.todacarreira.com/calculo-salario-liquido/

3. Como considerei o cálculo complexo e também que o foco deste Trabalho Prático é o React, disponibilizarei minha implementação do cálculo no fórum do módulo, mais especificamente no fórum fixado onde só o professor pode postar, referente ao Módulo 03.

4. Considerando que o aluno deve ter assistido as videoaulas até a Aula 7, espera-se que a implementação seja feita preferencialmente com Class Components. Entretanto, se o aluno desejar fazer a implementação com React Hooks, tudo bem. De qualquer forma, aconselho que seja feita com Class Componentes neste momento, pois o Desafio irá focar nos React Hooks.

5. Além dos cálculos, o aluno deverá implementar uma barra horizontal indicando, com cores diferenciadas:
- Percentual de desconto de INSS.
- Percentual de desconto do IRPF.
- Salário líquido.

6. A soma dos três itens acima deve ser exatamente o valor do salário bruto (100%).


### Dicas

- A aplicação que implementei só possui um atributo no objeto de this.state -> fullSalary.

- Isolei o cálculo do salário em um atributo de classe. O cálculo é feito em render(), antes de mostrar o JSX. Há alternativas mais performáticas, mas esta atendeu bem neste caso.
- Cor utilizada para a barra de desconto do INSS: #e67e22.
- Cor utilizada para a barra de desconto do IRPF: #c0392b.
- Cor utilizada para a barra do salário líquido: #16a085.
- Utilizei Intl para formar os valores monetários.
- Para a interface, utilizei o Materialize CSS.
- Criei os componentes <InputFullSalary /> (para o salário bruto), <InputReadOnly /> (para os demais valores) e <ProgressBarSalary /> (para mostrar a barra horizontal).