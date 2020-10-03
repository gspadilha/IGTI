window.addEventListener("load", init);

let dadosRetornadosUrl = null;

async function init() {
    dadosRetornadosUrl = await buscarDados();
    document.querySelector("#campoNome").addEventListener("input", filtrarDados);

    async function buscarDados() {
        let response = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo").catch((err) => console.log(er));
        let dados = await response.json();
        return dados;
    }

    function filtrarDados(event) {
        let data = dadosRetornadosUrl.results.filter((dado) => (dado.name.first.toLowerCase() + " " + dado.name.last.toLowerCase()).includes(event.target.value.toLowerCase()));
        let quantHomens = data.filter((dado) => dado.gender.toLowerCase() === "male");
        let quantMulheres = data.filter((dado) => dado.gender.toLowerCase() === "female");
        let somaDasIdades = data.reduce((acc, dado) => acc + dado.dob.age, 0);
        let mediaDasIdades = somaDasIdades / data.length;

        document.querySelector("#quantHomens").textContent = isNaN(quantHomens.length) ? 0 : quantHomens.length;
        document.querySelector("#quantMulheres").textContent = isNaN(quantMulheres.length) ? 0 : quantMulheres.length;
        document.querySelector("#somaDasIdades").textContent = isNaN(somaDasIdades) ? 0 : somaDasIdades;
        document.querySelector("#mediaDasIdades").textContent = isNaN(mediaDasIdades) ? 0 : mediaDasIdades;
    }
}
