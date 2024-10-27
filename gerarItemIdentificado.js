let especiesCatalogo = []
fetch("catalogacaoDados.xlsx").then(response => response.arrayBuffer()).then(data => {
    const workbook = XLSX.read(data, { type: 'array' });

    // Obtém a primeira planilha
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Converte a planilha para JSON
    especiesCatalogo = XLSX.utils.sheet_to_json(firstSheet);

    filtro("alfaDesc")
    especiesCatalogo.forEach(element => {
        gerarCatalogo(element)
    });
})
    .catch(error => {
        console.error('Erro ao carregar o arquivo Excel:', error);
    });

function filtro(tipo){
    if(tipo === "alfaCres"){
        especiesCatalogo.sort((a, b) => a.nomeP.localeCompare(b.nomeP));
    } else if(tipo === "alfaDesc"){
        especiesCatalogo.sort((a, b) => b.nomeP.localeCompare(a.nomeP));
    }
}