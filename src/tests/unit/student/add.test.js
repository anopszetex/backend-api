import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { createStudent } from './../../../resolvers/Mutation/student.js';

describe('Mutation to add a student', () => {
  it('Name cannot have white space', async () => {
    const input = {
      name: '  ',
      email: 'any_email@.com',
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      strictEqual(error.message, 'Invalid.whitespace');
      strictEqual(error.extensions.code, 'BUSINESS_VALIDATION_FAILED');
      strictEqual(error instanceof Error, true);
    }
  });

  it.todo('Name cannot have more than 100 characters');
  it.todo('Email cannot have white space');
  it.todo('Email cannot be empty');

  it.todo('Email must have a valid format (e.g. demo@demo.com');
  it.todo('Email cannot have more than 100 characters');
  it.todo('CPF cannot have white space');
  it.todo('CPF must have 11 characters');
  it.todo('CPF must be unique');

  it.todo('RA cannot have white space');
  it.todo('RA must have 6 characters');
  it.todo('RA must be unique');
});
