import { describe, before, /* before, after, */ it } from 'node:test';

import { buildServer } from './../../server/index.js';

import { setTimeout } from 'node:timers/promises';

describe('API Workflow', () => {
  // const server = null;
  before(async () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5434';
    process.env.DB_USER = 'root1';
    process.env.DB_PASSWORD = 'root1';
    process.env.DB_NAME = 'students-dev';
    // const server = await buildServer();
    // await server.listen(4000);
  });

  // after(async () => {
  //   await server.close();
  // });

  it('sss', async () => {
    const server = await buildServer();

    const query = `
        query Students {
           students {
            id
            nome
            email
          }
        }`;

    const res = await server.get().inject({
      method: 'POST',
      url: '/graphql',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      payload: JSON.stringify({ query }),
    });

    // console.log('res', res);
    await setTimeout(1000);

    await server.stop();
  });
});
