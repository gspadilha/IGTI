package br.dev.gspadilha.appcalcularsalario.services;

public class CalcularIRPF {
    public static double execute(double base_calculo) {
        if (base_calculo < 1903.98) {
            return 0;
        }

        if (base_calculo < 2826.65) {
            return (base_calculo * 0.075) - 142.80;
        }

        if (base_calculo < 3751.05) {
            return (base_calculo * 0.15) - 354.80;
        }

        if (base_calculo < 4664.68 ) {
            return (base_calculo * 0.225) - 636.13;
        }

        return (base_calculo * 0.275) - 869.36;
    }
}