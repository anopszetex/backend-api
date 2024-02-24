import { buildServer } from './server/index.js';

async function start() {
  const server = await buildServer();

  await server.listen();
}

start().catch(console.err);
