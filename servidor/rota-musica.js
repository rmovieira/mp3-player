const arquivos = require('./arquivos');

async function routes(fastify, options) {
    fastify.get('/musica/todas', {
        schema: {
            description: 'Retorna todas as musicas',
            tags: ['musica'],
            summary: 'Retorna todas as musicas no diretorio de arquivos',
            response: {
                200: {
                    description: 'Succesful response',
                    type: 'array',
                    properties: {
                        items: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const resultado = await arquivos.recuperarTodas();
        return resultado;
    });

    fastify.get('/musica', {
        schema: {
            description: 'Pesquisa textual',
            tags: ['musica'],
            summary: 'Pesquisa por um texto no nome, album, artista e genero da música.',
            querystring: {
                type: 'object',
                properties: {
                    texto: { type: 'string' },
                }
            },
            response: {
                200: {
                    description: 'Succesful response',
                    type: 'array',
                    properties: {
                        items: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { texto } = request.query;
        const resultado = await arquivos.pesquisar(texto);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(resultado);
    });

    fastify.get('/musica/:id', {
        schema: {
            description: 'Recupera o arquivo',
            tags: ['musica'],
            summary: 'Obtem do servidor o arquivo desejado.',
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Identificador único do arquivo'
                    }
                }
            },
            response: {
                200: {
                    description: 'Succesful response',
                    type: 'array',
                    properties: {
                        items: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        const streamDoArquivo = await arquivos.recuperarArquivo(id);
        reply
            .code(200)
            .header('Content-Type', 'application/octet-stream')
            .send(streamDoArquivo);
    });
}

module.exports = routes;