const path = require('path');
const fsPromises = require('fs').promises;
const fsSync = require('fs');

const handleUpload = async (request, reply, { log }, options) => {
const inputFilePath = path.join(__dirname, 'tmp', `uploaded_${Date.now()}.${request.fileExtension}`);

  try {
    const fileBuffer = request.fileBuffer;
    await fsPromises.writeFile(inputFilePath, fileBuffer);

    reply
      .code(200) //File uploaded successfully
      .header('Content-Type', 'application/json')
      .send({ success: true });

    if (fsSync.existsSync(inputFilePath)) fsPromises.unlink(inputFilePath);
  } catch (error) {
    console.log(error)
    if (fsSync.existsSync(inputFilePath)) fsPromises.unlink(inputFilePath);
    log.error('Error while converting to Presentation', error);
    reply.code(500).send(error.message);
  }
};

module.exports = handleUpload;
