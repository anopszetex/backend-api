import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { createStudent } from './../../../resolvers/Mutation/student.js';

describe('Mutation to add a student', () => {
  function expectError(error, message) {
    strictEqual(error.message, message);
    strictEqual(error.extensions.code, 'BUSINESS_VALIDATION_FAILED');
    strictEqual(error instanceof Error, true);
  }

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
      expectError(error, 'Invalid.whitespace');
    }
  });

  it('Name cannot be null or undefined', async () => {
    const input = {
      name: null,
      email: 'any_email@.com',
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.name');
    }
  });

  it('Name cannot be null or undefined', async () => {
    const input = {
      name: 'any_name',
      email: 'any_email@.com',
      cpf: '12345678900',
      ra: '123456',
    };

    input.name = undefined;

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.name');
    }
  });

  it('Name cannot have more than 100 characters', async () => {
    const input = {
      name: 'a'.repeat(101),
      email: 'any_email@.com',
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.length');
    }
  });

  it('Email cannot be empty', async () => {
    const input = {
      name: 'any_name',
      email: undefined,
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.email');
    }
  });

  it('Email cannot have white space', async () => {
    const input = {
      name: 'any_name',
      email: '  ',
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.emailWithWhitespace');
    }
  });

  it('Email cannot have more than 100 characters', async () => {
    const input = {
      name: 'any_name',
      email: 'a'.repeat(101),
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.EmailLength');
    }
  });

  it('Email must have a valid format (e.g. demo@demo.com', async () => {
    const input = {
      name: 'any_name',
      email: 'teste',
      cpf: '12345678900',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.emailFormat');
    }
  });

  it('CPF cannot be null', () => {
    const input = {
      name: 'any_name',
      email: 'any_email@.com',
      cpf: null,
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
    } catch (error) {
      expectError(error, 'Invalid.cpf');
    }
  });

  it.todo('CPF cannot have white space', () => {});

  it.todo('CPF must have 11 characters');
  it.todo('CPF must be unique');

  it.todo('RA cannot have white space');
  it.todo('RA must have 6 characters');
  it.todo('RA must be unique');
});
