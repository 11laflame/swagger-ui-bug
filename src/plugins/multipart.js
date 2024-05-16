const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  fastify.register(require('@fastify/multipart'), options.multipart);
}, { name: 'multipart' });
