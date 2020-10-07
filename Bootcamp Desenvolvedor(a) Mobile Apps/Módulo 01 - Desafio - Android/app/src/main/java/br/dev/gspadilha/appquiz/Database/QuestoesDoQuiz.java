package br.dev.gspadilha.appquiz.Database;

import java.util.ArrayList;
import java.util.List;

public class QuestoesDoQuiz {

    private String pergunta;
    private Boolean resposta;

    public QuestoesDoQuiz(String pergunta, Boolean resposta){
        this.pergunta = pergunta;
        this.resposta = resposta;
    }

    public String getPergunta(){
        return this.pergunta;
    }

    public Boolean getResposta(){
        return this.resposta;
    }
}
