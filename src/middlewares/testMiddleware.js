const path = require('path');
const { fileConfig } = require('../lib/config');

async function checkFile(request, reply) {
  if (!request.isMultipart()) {
    reply.status(400).send({
      error: 'Wrong request format',
    });
    return;
  }

  const file = await request.file();

  if (file) {
    if (file.filename.length > fileConfig.nameMaxLength) {
      reply.status(400).send({
        error: `Filename is too long. Maximum allowed length is ${fileConfig.nameMaxLength} characters`,
      });
      return;
    }

    try {
      request.fileBuffer = await file.toBuffer();

      const fileExtension = path.extname(file.filename);
      request.fileExtension = fileExtension

    } catch (err) {
      console.log(err)
      reply.status(500).send({
          error: `Internal server error`,
      });
    }
  } 

  return;
}

module.exports = checkFile;
