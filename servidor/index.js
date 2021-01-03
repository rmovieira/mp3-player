// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: { prettyPrint: true },
});

fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: '192.168.15.6:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'musica', description: 'Operações de musicas' },
        ],
        // definitions: {
        //     User: {
        //         type: 'object',
        //         required: ['id', 'email'],
        //         properties: {
        //             id: { type: 'string', format: 'uuid' },
        //             firstName: { type: 'string' },
        //             lastName: { type: 'string' },
        //             email: { type: 'string', format: 'email' }
        //         }
        //     }
        // },
        // securityDefinitions: {
        //     apiKey: {
        //         type: 'apiKey',
        //         name: 'apiKey',
        //         in: 'header'
        //     }
        // }
    },
    exposeRoute: true
});

fastify.register(require('./rota-musica'));

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
});



// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()