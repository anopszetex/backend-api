import { describe, before, after, it } from 'node:test';

import { buildServer } from './../../server/index.js';

describe('API Workflow', () => {
  // const server = null;
  // before(async () => {
  //   const server = await buildServer();
  //   await server.listen(4000);
  // });

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

    console.log('res', res);

    await server.stop();
  });
});
