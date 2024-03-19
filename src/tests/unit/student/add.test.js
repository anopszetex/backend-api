import { describe, it } from 'node:test';
import { fail, strictEqual } from 'node:assert';

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
      fail('Should not reach this point');
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
      fail('Should not reach this point');
    } catch (error) {
      expectError(error, 'Invalid.emailFormat');
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
      expectError(error, 'Invalid.cpfWithWhitespace');
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
      expectError(error, 'Invalid.cpfLength');
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
      expectError(error, 'Invalid.raWithWhitespace');
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
      expectError(error, 'Invalid.raLength');
    }
  });

  it.todo('validate is cpf is valid');

  it.todo('must create a student');

  // todo - must be test e2e
  it.todo('RA must be unique');
  it.todo('CPF must be unique');
  it.todo('must return the student');
});
