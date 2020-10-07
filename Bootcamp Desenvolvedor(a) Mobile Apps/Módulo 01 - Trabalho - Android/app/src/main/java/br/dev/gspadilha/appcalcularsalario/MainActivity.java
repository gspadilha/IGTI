package br.dev.gspadilha.appcalcularsalario;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText editSalarioBruto;
    EditText editNumeroDependentes;
    EditText editOutrosDescontos;
    Button btnCalcular;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editSalarioBruto = (EditText) findViewById(R.id.editSalarioBruto);
        editNumeroDependentes = (EditText) findViewById(R.id.editNumeroDependentes);
        editOutrosDescontos = (EditText) findViewById(R.id.editOutrosDescontos);

        editNumeroDependentes.setText("0");
        editOutrosDescontos.setText("0");

        btnCalcular = (Button) findViewById(R.id.btnCalcular);
        btnCalcular.setOnClickListener(btnCalcularListener);
    }

    private View.OnClickListener btnCalcularListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            if (editSalarioBruto.getText().toString().equals("")) {
                Toast.makeText(MainActivity.this, "Salário Bruto: Campo Obrigatório", Toast.LENGTH_LONG).show();
                return;
            }

            if (editSalarioBruto.getText().toString().equals("")) {
                editSalarioBruto.setText("0");
            }

            if (editOutrosDescontos.getText().toString().equals("")) {
                editOutrosDescontos.setText("0");
            }

            chamarResultActivity(MainActivity.this);
        }
    };

    private void chamarResultActivity(Context context) {
        Intent mensagemParaOutraActivity = new Intent(context, ResultActivity.class);
        mensagemParaOutraActivity.putExtra("MainActivity.salarioBruto", Double.valueOf(editSalarioBruto.getText().toString()));
        mensagemParaOutraActivity.putExtra("MainActivity.numeroDependentes", Double.valueOf(editNumeroDependentes.getText().toString()));
        mensagemParaOutraActivity.putExtra("MainActivity.outrosDescontos", Double.valueOf(editOutrosDescontos.getText().toString()));
        startActivity(mensagemParaOutraActivity);
    }
}