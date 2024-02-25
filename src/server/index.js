import fastify from 'fastify';
import mercurius from 'mercurius';
import closeWithGrace from 'close-with-grace';

import { makeExecutableSchema } from '@graphql-tools/schema';

import { buildResolvers, buildTypeDefs } from './graphqlLoader.js';
import { createConnection } from '../infra/db/index.js';

export async function buildServer(signal) {
  const app = fastify({ logger: true });

  const [typeDefs, resolvers] = await Promise.all([
    buildTypeDefs(),
    buildResolvers(),
  ]);

  const database = createConnection();

  app.register(mercurius, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    context(request, reply) {
      return {
        database,
      };
    },
  });

  app.get('/.well-known/health', { logLevel: 'warn' }, () => ({
    status: 'OK',
  }));

  closeWithGrace({ delay: 500 }, () => {
    app.log.info('Close server');
    app.server.close();
    app.close();
  });

  return {
    get() {
      return app;
    },
    async listen(port) {
      await app.listen({ host: '0.0.0.0', port });
    },
  };
}
