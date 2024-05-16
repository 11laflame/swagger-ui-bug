const { readFileSync } = require('fs');
const path = require('path');

const Swagger = require('@fastify/swagger');
const SwaggerUI = require('@fastify/swagger-ui');
const fp = require('fastify-plugin');

const { version } = JSON.parse(readFileSync(path.join(__dirname, '../../package.json')));

async function swaggerGenerator (fastify, opts) {
  // Swagger documentation generator for Fastify.
  await fastify.register(Swagger, {
    mode: 'dynamic',
    openapi: {
      openapi: '3.0.0', // Specify OpenAPI version
      info: {
        title: 'swagger-bug',
        description: 'Swagger bug UI.',
        version,
      },
      servers: [
        {
          url: 'http://localhost:3000', // and your deployed url
        },
      ],
      components: {},
      paths: {}, // Define paths here or dynamically from routes
    },
    // Let's expose the documentation only in development
    exposeRoute: process.env.NODE_ENV !== 'production',
  });

  if (process.env.NODE_ENV !== 'production') {
    await fastify.register(SwaggerUI, {
      routePrefix: '/documentation',
    });
  }
}

module.exports = fp(swaggerGenerator, {
  name: 'swaggerGenerator',
});