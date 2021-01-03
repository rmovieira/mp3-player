const fs = require('fs');
const mm = require('music-metadata');
const path = require("path");

let arquivosCarregados;

const lerArquivos = async () => {
    const diretorio = 'musicas';
    arquivosCarregados = new Map();
    if (!fs.existsSync(diretorio)) {
        console.log(`O diretorio ${diretorio} não existe.`);
        return;
    }

    try {
        arquivos = await fs.promises.readdir(diretorio);
        for (const file of arquivos) {
            const metadata = await mm.parseFile(`${diretorio}${path.sep}${file}`);
            const caminhoArquivo = path.resolve(`${diretorio}${path.sep}${file}`).replace(/[\\]/g, path.sep);
            const { genre: genero, album, title: titulo, artist: artista, artists: artistas } = metadata.common;
            const arquivo = { genero, album, titulo, artista, artistas, arquivo: caminhoArquivo };
            arquivosCarregados.set(`${titulo}_${artista}`, arquivo);
        }
    } catch (error) {
        console.error('there was an error:', error.message);
    }

    return arquivosCarregados.values();
}

module.exports = {
    lerArquivos,
}