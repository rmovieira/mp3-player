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
        const resultado = await arquivos.lerArquivos();
        return Array.from(resultado);
    });
}

// fastify.get('/musica', function (request, reply) {
//     const fs = require('fs')
//     const stream = fs.createReadStream('file_example_MP3_700KB.mp3');
//     reply.send(stream);
// });

module.exports = routes;