import { describe, before, /* before, after, */ it } from 'node:test';

import { buildServer } from './../../server/index.js';

import { setTimeout } from 'node:timers/promises';
import { strictEqual } from 'node:assert';

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

  it('Should list the students', async () => {
    const server = await buildServer();

    // await server.migrate();
    // await server.seed();

    await setTimeout(2500);

    const query = `
        query Students {
           students {
            id
            name
            email
            ra
            cpf
          }
        }`;

    const request = await server.get().inject({
      method: 'POST',
      url: '/graphql',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      payload: JSON.stringify({ query }),
    });

    const response = request.json();

    strictEqual(request.statusCode, 200);
    strictEqual(response.data.students.length, 5);

    for (const student of response.data.students) {
      strictEqual(typeof student.id, 'string');
      strictEqual(typeof student.name, 'string');
      strictEqual(typeof student.email, 'string');
      strictEqual(typeof student.ra, 'string');
      strictEqual(typeof student.cpf, 'string');

      strictEqual(Object.prototype.hasOwnProperty.call(student, 'id'), true);
      strictEqual(Object.prototype.hasOwnProperty.call(student, 'name'), true);
      strictEqual(Object.prototype.hasOwnProperty.call(student, 'email'), true);
      strictEqual(Object.prototype.hasOwnProperty.call(student, 'ra'), true);
      strictEqual(Object.prototype.hasOwnProperty.call(student, 'cpf'), true);
    }

    await server.stop();
  });
});
