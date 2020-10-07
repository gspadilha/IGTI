package br.dev.gspadilha.appquiz;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

public class LaunchActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch);

        splashScreenTimer();
    }

    private void splashScreenTimer() {
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                redirecionarParaActivity();
            }
        }, 1000);
    }

    private void redirecionarParaActivity() {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}