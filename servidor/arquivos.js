const fs = require('fs');
const mm = require('music-metadata');
const path = require('path');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const deburr = require('lodash.deburr');

let arquivosCarregados;
let carregandoArquivos = false;

const recuperarTodas = () => {
    return Array.from(arquivosCarregados.values());
}

const lerArquivos = async (diretorio) => {
    console.log('Carregando arquivos em:', diretorio);
    if (!fs.existsSync(diretorio)) {
        console.error(`O diretorio ${diretorio} não existe.`);
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
                    const { duration: duracao } = metadata.format;
                    const uuid = uuidv4();
                    const arquivo = { id: uuid, genero, titulo, artistas, album, duracao, arquivo: caminhoArquivo };
                    arquivosCarregados.set(uuid, arquivo);
                } catch (erro) {
                    console.error('Não foi possível recuperar metadados do arquivo', caminhoArquivo, erro.message);
                }
            }
        }
    } catch (erro) {
        console.error('Erro generico:', erro.message);
    }
}

const pesquisar = texto => {
    const saida = [];
    for (let arquivoCarregado of arquivosCarregados) {
        const { genero, titulo, artistas, album, arquivo, id } = arquivoCarregado[1];
        const textoDaMusica = [].concat(genero).concat(album).concat(titulo).concat(artistas).join(' ');
        const achou = deburr(textoDaMusica).toLocaleLowerCase().indexOf(deburr(texto).toLocaleLowerCase());
        if (achou > 0) {
            saida.push(arquivoCarregado[1]);
        }
    }
    return saida;
}

const recuperarArquivo = idArquivo => {
    const arquivo = arquivosCarregados.get(idArquivo);
    if (!arquivo) {
        return;
    }
    const stream = fs.createReadStream(arquivo.arquivo);
    return stream;
}

(async function () {
    arquivosCarregados = new Map();
    dotenv.config();
    const diretorio = process.env.MUSICAS;
    carregandoArquivos = true;
    console.log('----Lendo os arquivos em : ' + diretorio);
    await lerArquivos(diretorio);
    console.log('Quantidade de arquivos encontrados:', arquivosCarregados.size);
    carregandoArquivos = false;
    console.log('----Leu os arquivos em : ' + diretorio);
})();

module.exports = {
    lerArquivos,
    pesquisar,
    recuperarArquivo,
    recuperarTodas,
}