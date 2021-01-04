const fs = require('fs');
const mm = require('music-metadata');
const path = require('path');
const lunr = require('lunr');
// require("lunr-languages/lunr.stemmer.support")(lunr)
// require("lunr-languages/lunr.pt")(lunr)

let arquivosCarregados;
let indiceTextual;
let carregandoArquivos = false;

const indexar = async () => {
    try {
        indiceTextual = lunr(function () {
            // this.use(lunr.pt)
            this.ref('arquivo');
            this.field('texto');
            // this.field('titulo');
            // this.field('genero');
            // this.field('album');
            // this.field('artista');
            // this.field('artistas');
            for (let arquivoCarregado of arquivosCarregados) {
                const { genero, titulo, artistas, album, arquivo } = arquivoCarregado[1];
                const texto = [].concat(genero).concat(album).concat(titulo).concat(artistas).join(' ');
                const dadosParaIndexar = { texto, arquivo };
                this.add(dadosParaIndexar);
            }
        });

    } catch (erro) {
        console.error('Não foi possível indexar:', erro.message);
    }
}


const lerArquivos = async (diretorio) => {
    console.log('Carregando arquivos em:', diretorio);
    if (!fs.existsSync(diretorio)) {
        console.log(`O diretorio ${diretorio} não existe.`);
        return;
    }

    try {
        const arquivos = await fs.promises.readdir(diretorio);
        for (const file of arquivos) {
            const caminhoArquivo = path.resolve(`${diretorio}${path.sep}${file}`).replace(/[\\]/g, path.sep);
            const arquivo = await fs.promises.stat(caminhoArquivo);
            if (arquivo.isDirectory()) {
                await lerArquivos(caminhoArquivo)
            } else {
                try {
                    const metadata = await mm.parseFile(caminhoArquivo);
                    const { genre: genero, album, title: titulo, artist: artista, artists: artistas } = metadata.common;
                    const arquivo = { genero, titulo, artistas, album, arquivo: caminhoArquivo };
                    arquivosCarregados.set(caminhoArquivo, arquivo);
                } catch (erro) {
                    console.error('Não foi possível recuperar metadados do arquivo', caminhoArquivo, erro.message);
                }
            }
        }
    } catch (erro) {
        console.error('there was an error:', erro.message);
    }
}


const pesquisar = texto => {
    if (!indiceTextual || carregandoArquivos) {
        return;
    }
    const saida = [];
    const resultado = indiceTextual.search(texto);
    resultado.forEach(musica => {
        console.log(musica.ref);
        const arquivo = arquivosCarregados.get(musica.ref);
        saida.push(arquivo);
    });
    console.log('saida', saida);
    return saida;
}

(async function () {
    arquivosCarregados = new Map();
    const diretorio = 'C:\\Users\\Romulo\\Documents\\mp3-player\\servidor\\musicas';
    carregandoArquivos = true;
    console.log('----Lendo os arquivos em : ' + diretorio);
    await lerArquivos(diretorio);
    await indexar();
    console.log('Quantidade de arquivos encontrados:', arquivosCarregados.size);
    carregandoArquivos = false;
    console.log('----Leu os arquivos em : ' + diretorio);
})();

module.exports = {
    lerArquivos,
    pesquisar,
}