import { buildServer } from './server/index.js';

async function start() {
  const server = await buildServer();

  const port = process.env.PORT || 4000;

  try {
    await server.listen(port);
  } catch (err) {
    server.get().log.error(`Error starting server: ${err}`);
    return Promise.reject(err);
  }
}

start().catch(console.err);
