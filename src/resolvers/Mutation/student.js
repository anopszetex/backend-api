import {
  ValidationError,
  AppError,
  isValidEmail,
  isValidFormat,
  sanitizeCpf,
} from '../../support/index.js';

function validateField(value, fieldName) {
  if (!value) {
    return Promise.reject(ValidationError.build(`Invalid.${fieldName}`));
  }

  if (typeof value == 'string' && !value.trim()) {
    return Promise.reject(
      ValidationError.build(`Invalid.${fieldName}.withWhitespace`)
    );
  }

  if (value.length > 100) {
    return Promise.reject(ValidationError.build(`Invalid.${fieldName}.length`));
  }
}

async function validateEmail(email) {
  await validateField(email, 'email');

  if (!isValidEmail(email)) {
    return Promise.reject(ValidationError.build('Invalid.email.format'));
  }
}

async function validateCpf(cpf) {
  const newCpf = sanitizeCpf(cpf);

  await validateField(cpf, 'cpf');

  if (newCpf.length !== 11) {
    return Promise.reject(ValidationError.build('Invalid.cpf.length'));
  }

  if (!isValidFormat(newCpf)) {
    return Promise.reject(ValidationError.build('Invalid.cpf.format'));
  }
}

async function validateRa(ra) {
  if (ra && !ra.trim()) {
    return Promise.reject(ValidationError.build('Invalid.ra.withWhitespace'));
  }

  if (ra && ra.length > 6) {
    return Promise.reject(ValidationError.build('Invalid.ra.length'));
  }
}

function parseToNumber(value) {
  if (value) {
    return +value;
  }
}

export async function createStudent(_, args, context) {
  const { name, email, cpf, ra } = args.input ?? {};

  await Promise.all([
    validateField(name, 'name'),
    validateEmail(email),
    validateCpf(cpf),
    validateRa(ra),
  ]);

  const [res] = await context
    .database('students')
    .insert({ name, email, cpf, ra })
    .returning(['*'])
    .catch((err) => {
      return Promise.reject(AppError.build('errorSave'));
    });

  return res;
}

export async function delStudent(_, args, context) {
  const { id } = args;

  const isValidId = parseToNumber(id);

  if (!isValidId) {
    return Promise.reject(ValidationError.build('Invalid.id'));
  }

  const { database } = context;

  const res = await database('students')
    .where({ id })
    .del()
    .catch(() => {
      return Promise.reject(AppError.build('errorDelete'));
    });

  return !!res;
}

export async function updateStudent(_, args, context) {
  const { name, email, cpf, ra } = args.input ?? {};
  const { id } = args;

  const isValidId = parseToNumber(id);

  if (!isValidId) {
    return Promise.reject(ValidationError.build('Invalid.id'));
  }

  await Promise.all([
    validateField(name, 'name'),
    validateEmail(email),
    validateCpf(cpf),
    validateRa(ra),
  ]);

  const [res] = await context
    .database('students')
    .where({ id })
    .update({ name, email, cpf, ra })
    .returning(['*'])
    .catch((err) => {
      return Promise.reject(AppError.build('errorUpdate'));
    });

  return res;
}
