let especiesCatalogo = []
fetch("catalogacaoDados.xlsx").then(response => response.arrayBuffer()).then(data => {
    const workbook = XLSX.read(data, { type: 'array' });

    // Obtém a primeira planilha
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Converte a planilha para JSON
    especiesCatalogo = XLSX.utils.sheet_to_json(firstSheet);

    filtro("alfaCres")
    especiesCatalogo.forEach(element => {
        gerarCatalogo(element)
    });
    console.log(especiesCatalogo)

})
    .catch(error => {
        console.error('Erro ao carregar o arquivo Excel:', error);
    });

function filtro(tipo){
    if(tipo === "alfaCres"){
        especiesCatalogo.sort((a, b) => a.nomeP.localeCompare(b.nomeP));
    }
}