package br.dev.gspadilha.appcalcularsalario.services;

public class CalcularINSS {
    public static double execute(double salario) {
        if (salario < 1045.00) {
            return (salario * 0.075);
        }

        if (salario < 2089.60) {
            return (salario * 0.09) - 15.67;
        }

        if (salario < 3134.40) {
            return (salario * 0.12) - 78.36;
        }

        if (salario < 6101.06) {
            return (salario * 0.14) - 141.05;
        }

        return 713.01;
    }
}
