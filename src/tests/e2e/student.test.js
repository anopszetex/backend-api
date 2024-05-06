import { describe, beforeEach, afterEach, it, after } from 'node:test';

import { buildServer } from './../../server/index.js';
import { deepStrictEqual, strictEqual } from 'node:assert';

// eslint-disable-next-line n/no-unpublished-import
import { PostgreSqlContainer } from '@testcontainers/postgresql';

describe('API Workflow', () => {
  let container = null;
  let server = null;

  beforeEach(async () => {
    container = await new PostgreSqlContainer()
      .withDatabase('students-dev')
      .withExposedPorts({ host: 5433, container: 5432 })
      .withUsername('root1')
      .withPassword('root1')
      .start();

    server = await buildServer();
    await server.migrate();
    await server.seed();
  });

  afterEach(async () => {
    await server.stop();
    await container.stop();
  });

  after(async () => {
    await container.stop();
  });

  it('Should list the students', async (t) => {
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
  });

  it('Create a student', async (t) => {
    const query = `
    mutation CreateStudent($input: StudentInput!){
           createStudent(input: $input) {
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
      payload: JSON.stringify({
        query,
        variables: {
          input: {
            name: 'John Doe',
            email: 'teste@teste.com',
            ra: '123456',
            cpf: '12345678901',
          },
        },
      }),
    });

    const response = request.json();

    strictEqual(request.statusCode, 200);

    deepStrictEqual(response.data.createStudent, {
      id: '51',
      name: 'John Doe',
      email: 'teste@teste.com',
      ra: '123456',
      cpf: '12345678901',
    });
  });
});
