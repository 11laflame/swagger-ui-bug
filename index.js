require('dotenv').config()

const fastify = require('fastify')
const closeWithGrace = require('close-with-grace')
const config = require('./src/lib/config')
const logger = require('./src/lib/logger')(config.log)
const services = require('./src/app')

async function main () {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

  const app = fastify({ logger })
  app.register(services(config))

  const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }) {
    if (err) {
      app.log.error({ msg: 'Error closing app', err })
    }
    await app.close()
    app.log.info({ msg: 'App closed' })
  })

  app.addHook('onClose', (instance, done) => {
    closeListeners.uninstall()
    done()
  })

  try {
    await app.listen({ host: process.env.HOST || '0.0.0.0', port: process.env.PORT || 3000 });
    logger.info('Server is ready!')
  } catch (err) {
    app.log.fatal({ msg: 'Error starting app', err })
    process.exit(1)
  }
}

main()
