package br.dev.gspadilha.appquiz;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ResultActivity extends AppCompatActivity {

    TextView tvResultado;
    Button btnReiniciar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        Intent intent = getIntent();
        Double porcentagemAcertos = intent.getDoubleExtra("porcentagemAcertos", 0.0);

        tvResultado = (TextView) findViewById(R.id.tvResultado);
        tvResultado.setText(porcentagemAcertos.toString() + "% de acertos");

        btnReiniciar = (Button) findViewById(R.id.btnReiniciar);
        btnReiniciar.setOnClickListener(btnReiniciarListener);
    }

    private View.OnClickListener btnReiniciarListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            // Encerra essa Activity, voltando para a anterior da pilha
            finish();
        }
    };
}