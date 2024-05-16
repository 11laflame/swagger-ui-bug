require('dotenv').config();
const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  log: {
    level: 'info',
    pretty: true
  },
  app: {
    port: process.env.PORT
  },
  autoload: [
    { path: path.join(__dirname, '../plugins') },
    { path: path.join(__dirname, '../routes') }
  ],
  multipart: {
    limits: {
      files: 5,
      fileSize: 20 * 1024 * 1024, // 20MB,
    },
  },
  fileConfig: {
    nameMaxLength: 100,
  },
};
