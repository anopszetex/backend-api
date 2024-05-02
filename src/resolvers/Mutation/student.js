import {
  ValidationError,
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

export async function createStudent(parent, args, context) {
  const { name, email, cpf, ra } = args.input ?? {};

  await Promise.all([
    validateField(name, 'name'),
    validateEmail(email),
    validateCpf(cpf),
    validateRa(ra),
  ]);

  // await context.database('students').insert({ name, email, cpf, ra });

  return null;
}
