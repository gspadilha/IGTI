package br.dev.gspadilha.appquiz;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import br.dev.gspadilha.appquiz.Database.QuestoesDoQuiz;

public class MainActivity extends AppCompatActivity {

    TextView tvQuestaoMostradaNaTela;

    ImageView imagemErro;
    ImageView imagemAcerto;

    Button btnEscolhaVerdadeira;
    Button btnEscolhaFalsa;

    List<QuestoesDoQuiz> questoes;
    Integer questaoMostrada = 0;
    Integer quantidadeDeAcertos = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // volta pra o tema original
        setTheme(R.style.AppTheme);

        questoes = new ArrayList<QuestoesDoQuiz>() {
            {
                add(new QuestoesDoQuiz("Voce testou?", false));
                add(new QuestoesDoQuiz("Voce vai testar?", true));
            }
        };

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        imagemErro = (ImageView) findViewById(R.id.imagemErro);
        imagemAcerto = (ImageView) findViewById(R.id.imagemAcerto);

        mostrarPerguntaNaTela();

        btnEscolhaVerdadeira = (Button) findViewById(R.id.btnVerdadeiro);
        btnEscolhaVerdadeira.setOnClickListener(btnEscolheuVerdadeira);

        btnEscolhaFalsa = (Button) findViewById(R.id.btnFalso);
        btnEscolhaFalsa.setOnClickListener(btnEscolheuFalsa);
    }

    private void mostrarPerguntaNaTela() {
        imagemErro.setVisibility(View.INVISIBLE);
        imagemAcerto.setVisibility(View.INVISIBLE);

        tvQuestaoMostradaNaTela = (TextView) findViewById(R.id.tvQuestao);
        tvQuestaoMostradaNaTela.setText(questoes.get(questaoMostrada).getPergunta());
    }

    private View.OnClickListener btnEscolheuVerdadeira = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            verificarResposta(true);
        }
    };

    private View.OnClickListener btnEscolheuFalsa = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            verificarResposta(false);
        }
    };

    public void verificarResposta(Boolean respostaEscolhida) {
        QuestoesDoQuiz questaoNaTela = questoes.get(questaoMostrada);

        if (questaoNaTela.getResposta().equals(respostaEscolhida)) {
            imagemErro.setVisibility(View.INVISIBLE);
            imagemAcerto.setVisibility(View.VISIBLE);
            quantidadeDeAcertos++;
        }

        if (!questaoNaTela.getResposta().equals(respostaEscolhida)) {
            imagemErro.setVisibility(View.VISIBLE);
            imagemAcerto.setVisibility(View.INVISIBLE);
        }

        if (questaoMostrada.equals(questoes.size()-1)) {
            Toast.makeText(this, "Mostrando Resultado Final", Toast.LENGTH_SHORT).show();

            new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                @Override
                public void run() {
                    redirecionarParaMostrarResultados();
                }
            }, 2000);
        }

        if (questaoMostrada < questoes.size()-1) {
            new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                @Override
                public void run() {
                    questaoMostrada++;
                    mostrarPerguntaNaTela();
                }
            }, 2000);
        }
    }

    public void redirecionarParaMostrarResultados() {
        Double porcentagemAcertos = quantidadeDeAcertos * 100.0 / (questoes.size());
        Intent intent = new Intent(this, ResultActivity.class);
        intent.putExtra("porcentagemAcertos", porcentagemAcertos);
        startActivity(intent);
    }
}