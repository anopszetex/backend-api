import { describe, it } from 'node:test';
import { fail, strictEqual, deepEqual } from 'node:assert';

import { createStudent } from './../../../src/resolvers/Mutation/student.js';

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
      expectError(error, 'Invalid.name.withWhitespace');
    }
  });

  it('Name cannot be null', async () => {
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

  it('Name cannot be undefined', async () => {
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
      expectError(error, 'Invalid.name.length');
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
      fail('Should not reach this point');
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
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.email.withWhitespace');
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
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.email.length');
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
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.email.format');
    }
  });

  it('CPF cannot be null', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: null,
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.cpf');
    }
  });

  it('CPF cannot have white space', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '    ',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.cpf.withWhitespace');
    }
  });

  it('CPF must have 11 characters', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '32312321321321',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.cpf.length');
    }
  });

  it('CPF must have a valid format', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '123.413.45a-22',
      ra: '123456',
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.cpf.format');
    }
  });

  it('RA cannot have white space', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '28861701000',
      ra: '   ',
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.ra.withWhitespace');
    }
  });

  it('RA must have 6 characters', async () => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '28861701000',
      ra: '1234567', //* 7 characters
    };

    try {
      await createStudent({}, { input }, {});
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.ra.length');
    }
  });

  it('must create a student', async (t) => {
    const input = {
      name: 'any_name',
      email: 'teste@teste.com',
      cpf: '28861701000',
      ra: '123456',
    };

    const expected = Object.assign({}, input, { id: 1 });

    const query = Object.assign(Promise.resolve([expected]), {
      insert: t.mock.fn(() => query),
      returning: t.mock.fn(() => query),
    });

    const context = {
      database: t.mock.fn(() => query),
    };

    const res = await createStudent({}, { input }, context);

    strictEqual(res, expected);

    deepEqual(query.insert.mock.calls[0].arguments[0], input);
    strictEqual(query.insert.mock.calls.length, 1);

    deepEqual(query.returning.mock.calls[0].arguments[0], ['*']);
    strictEqual(query.returning.mock.calls.length, 1);

    deepEqual(context.database.mock.calls[0].arguments[0], 'students');
    deepEqual(context.database.mock.calls.length, 1);
  });
});
