import axios from 'axios';

const SERVIDOR_LOCAL = 'http://0.0.0.0:3000';

let servidorConfigurado = SERVIDOR_LOCAL;

const configuracaoPadrao = () => {
    return {
        baseURL: servidorConfigurado,
        timeout: 5000,
    };
};

export const conectarNoServidor = async servidor => {
    // console.log('conectar: ' + servidor || SERVIDOR_LOCAL);
    if (servidor) {
        servidorConfigurado = servidor;
        if (!servidorConfigurado.startsWith('http')) {
            servidorConfigurado = `http://${servidorConfigurado}`;
        }
    }
    try {
        const response = await axios.get('/', configuracaoPadrao());
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const pesquisarMusica = async texto => {
    try {
        const response = await axios.get(`/musica?texto=${texto}`, configuracaoPadrao());
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};
