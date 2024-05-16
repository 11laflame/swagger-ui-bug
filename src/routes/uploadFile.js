const testMiddleware = require('../middlewares/testMiddleware');

const uploadFile = require('../schema/uploadFile');

const handleUpload  = require('../services/handleUpload');

module.exports = function (fastify, opts, done) {
  fastify.post('/upload-file', { 
    preValidation: [ testMiddleware ],
    schema: uploadFile,
  }, (request, reply) => handleUpload(request, reply, fastify, opts));

  done();
};