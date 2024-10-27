for (let i = 1; i <= 33; i++) {
    especieNaoIdentificada = {
        modeloId: `modeloId${i}`,
        imgSrc: `imgs/especies/Não identificado/Achar especie ${i + 1}/1.jpg`,
        videoSrc: null
    }

    gerarCatalogoNaoIdentificado(especieNaoIdentificada)
}