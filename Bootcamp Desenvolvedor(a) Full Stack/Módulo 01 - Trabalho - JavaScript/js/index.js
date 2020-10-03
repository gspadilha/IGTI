document.addEventListener(
    "DOMContentLoaded",
    () => {
        atribuirCorInicial();
        iniciaControle();
    },
    false
);

function iniciaControle() {
    document.querySelectorAll(".range").forEach((item) => {
        item.addEventListener("input", (e) => {
            atribuirDoRangeParaInput(e.target.id);
            mudarCorCaixa();
        });
    });
}

function atribuirCorInicial() {
    atribuirDoRangeParaInput("redRange");
    atribuirDoRangeParaInput("greenRange");
    atribuirDoRangeParaInput("blueRange");
    mudarCorCaixa();
}

function atribuirDoRangeParaInput(origem) {
    let destino = origem.replace("Range", "Input");
    document.querySelector(`#${destino}`).value = document.querySelector(`#${origem}`).value;
}

function mudarCorCaixa() {
    let r = document.querySelector("#redInput").value;
    let g = document.querySelector("#greenInput").value;
    let b = document.querySelector("#blueInput").value;
    document.querySelector("#div_caixa").style.backgroundColor = `rgb(${r},${g},${b})`;
}
