package br.dev.gspadilha.appcalcularsalario;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import br.dev.gspadilha.appcalcularsalario.services.CalcularINSS;
import br.dev.gspadilha.appcalcularsalario.services.CalcularIRPF;

public class ResultActivity extends AppCompatActivity {

    TextView tvValorSalarioBruto;
    TextView tvValorINSS;
    TextView tvValorIRPF;
    TextView tvValorOutrosDescontos;
    TextView tvValorSalarioLiquido;
    TextView tvValorPorcentagemDescontos;
    Button btnVoltar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        tvValorSalarioBruto = (TextView) findViewById(R.id.tvValorSalarioBruto);
        tvValorINSS = (TextView) findViewById(R.id.tvValorINSS);
        tvValorIRPF = (TextView) findViewById(R.id.tvValorIRPF);
        tvValorOutrosDescontos = (TextView) findViewById(R.id.tvValorOutrosDescontos);
        tvValorSalarioLiquido = (TextView) findViewById(R.id.tvValorSalarioLiquido);
        tvValorPorcentagemDescontos = (TextView) findViewById(R.id.tvValorPorcentagemDescontos);

        btnVoltar = (Button) findViewById(R.id.btnVoltar);
        btnVoltar.setOnClickListener(btnVoltarListener);

        Intent intent = getIntent();
        Double salarioBruto = intent.getDoubleExtra("MainActivity.salarioBruto", 0.0);
        Double numeroDependentes = intent.getDoubleExtra("MainActivity.numeroDependentes", 0.0);
        Double outrosDescontos = intent.getDoubleExtra("MainActivity.outrosDescontos", 0.0);

        Double INSS = CalcularINSS.execute(salarioBruto);

        double baseCalculo = salarioBruto - INSS - (numeroDependentes * 189.59);

        Double IRPF  = CalcularIRPF.execute(baseCalculo);

        double salarioLiquido = baseCalculo - IRPF;
        double porcentagem = 100 - (salarioLiquido * 100) / salarioBruto;

        tvValorSalarioBruto.setText(salarioBruto.toString());
        tvValorINSS.setText(INSS.toString());
        tvValorIRPF.setText(IRPF.toString());
        tvValorOutrosDescontos.setText(outrosDescontos.toString());
        tvValorSalarioLiquido.setText("" + salarioLiquido);
        tvValorPorcentagemDescontos.setText("" + porcentagem);
    }

    private View.OnClickListener btnVoltarListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            // Encerra essa Activity, voltando para a anterior da pilha
            finish();
        }
    };
}