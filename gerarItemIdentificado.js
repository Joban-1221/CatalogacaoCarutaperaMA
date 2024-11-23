const todosCatalogos = document.getElementById("todosCatalogos")
let especiesCatalogo = []
let arrayCatalogoFiltrado = []
let filtroCatalogo = ""
let pesquisa = ""

function gerarEspeciesCatalogo() {
    fetch("catalogacaoDados.xlsx").then(response => response.arrayBuffer()).then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        // Obtém a primeira planilha
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Converte a planilha para JSON
        especiesCatalogo = XLSX.utils.sheet_to_json(firstSheet);

        arrayCatalogoFiltrado = especiesCatalogo
        gerarCatalogoIdentificado()
    })
        .catch(error => {
            console.error('Erro ao carregar o arquivo Excel:', error);
        });
}

function gerarCatalogoIdentificado() {
    if (arrayCatalogoFiltrado.length > 0) {
        arrayCatalogoFiltrado.forEach(element => {
            gerarCatalogo(element)
        });
    } else{
        arrayCatalogoFiltradoVazio()
    }
}

function arrayCatalogoFiltradoVazio(){
    todosCatalogos.innerHTML = ""
    const naoTemResultado = document.createElement("p")
    naoTemResultado.innerHTML = "Não há resultados"
    console.log("PAssou")

    todosCatalogos.appendChild(naoTemResultado)

}
function realizarPesquisa() {
    arrayCatalogoFiltrado = especiesCatalogo
    const palavraPesquisada = document.getElementById("pesquisa").value
    console.log(palavraPesquisada)
    arrayCatalogoFiltrado = arrayCatalogoFiltrado.filter(especie =>
        especie.nomeP.toLowerCase().includes(palavraPesquisada.toLowerCase())
    );
    gerarCatalogoIdentificado()
}


function ativarFiltro() {
    filtroCatalogo = document.getElementById("filtroSelect").value
    filtro(filtroCatalogo)
    gerarCatalogoIdentificado()
}
function filtro(tipo) {
    arrayCatalogoFiltrado = especiesCatalogo
    if (tipo === "alfaCres") {
        arrayCatalogoFiltrado.sort((a, b) => a.nomeP.localeCompare(b.nomeP));
    } else if (tipo === "alfaDesc") {
        arrayCatalogoFiltrado.sort((a, b) => b.nomeP.localeCompare(a.nomeP));
    } else if (tipo === "animal") {
        arrayCatalogoFiltrado = arrayCatalogoFiltrado.filter(element => element.reino === "animal")
    } else if (tipo === "planta") {
        arrayCatalogoFiltrado = arrayCatalogoFiltrado.filter(element => element.reino === "planta")
    } else if (tipo === "fungi") {
        arrayCatalogoFiltrado = arrayCatalogoFiltrado.filter(element => element.reino === "fungi")
    }
}

document.getElementById("filtroSelect").addEventListener("change", ativarFiltro)
document.getElementById("buttonPesquisar").addEventListener("click", realizarPesquisa)
gerarEspeciesCatalogo()