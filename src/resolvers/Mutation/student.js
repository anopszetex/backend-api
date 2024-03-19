import { ValidationError, isValidEmail } from '../../support/index.js';

// const validations = [
//   {
//     prop: 'name',
//     require: true,
//     type: 'string',
//     max: 100,
//     removeWhitespace: true,
//     messages: [
//       ['require', 'Invalid.name'],
//       ['whitespace', 'Invalid.whitespace'],
//       ['length', 'Invalid.length'],
//     ],
//   },
//   {
//     prop: 'email',
//     require: true,
//     type: 'string',
//     max: 100,
//     removeWhitespace: true,
//     messages: [
//       ['require', 'Invalid.email'],
//       ['whitespace', 'Invalid.emailWithWhitespace'],
//       ['length', 'Invalid.EmailLength'],
//       ['format', 'Invalid.emailFormat'],
//     ],
//   },
//   {
//     prop: 'cpf',
//     require: true,
//     type: 'string',
//     max: 11,
//     removeWhitespace: true,
//     messages: [
//       ['require', 'Invalid.cpf'],
//       ['whitespace', 'Invalid.cpfWithWhitespace'],
//       ['length', 'Invalid.cpfLength'],
//     ],
//   },
//   {
//     prop: 'ra',
//     require: false,
//     type: 'string',
//     max: 6,
//     removeWhitespace: true,
//     messages: [
//       ['whitespace', 'Invalid.raWithWhitespace'],
//       ['length', 'Invalid.raLength'],
//     ],
//   },
// ];

/**
 * Validates the given name.
 * @param {string} name - The name to be validated.
 * @return {Promise} A promise that resolves if the name is valid, or rejects with a validation error.
 */
async function validateName(name) {
  if (!name) {
    return Promise.reject(ValidationError.build('Invalid.name'));
  }

  if (!name.trim()) {
    return Promise.reject(ValidationError.build('Invalid.whitespace'));
  }

  if (name.length > 100) {
    return Promise.reject(ValidationError.build('Invalid.length'));
  }
}

async function validateEmail(email) {
  if (!email) {
    return Promise.reject(ValidationError.build('Invalid.email'));
  }

  if (!email.trim()) {
    return Promise.reject(ValidationError.build('Invalid.emailWithWhitespace'));
  }

  if (email.length > 100) {
    return Promise.reject(ValidationError.build('Invalid.EmailLength'));
  }

  if (!isValidEmail(email)) {
    return Promise.reject(ValidationError.build('Invalid.emailFormat'));
  }
}

async function validateCpf(cpf) {
  if (!cpf) {
    return Promise.reject(ValidationError.build('Invalid.cpf'));
  }

  if (!cpf.trim()) {
    return Promise.reject(ValidationError.build('Invalid.cpfWithWhitespace'));
  }

  if (cpf.length !== 11) {
    return Promise.reject(ValidationError.build('Invalid.cpfLength'));
  }
}

async function validateRa(ra) {
  if (ra && !ra.trim()) {
    return Promise.reject(ValidationError.build('Invalid.raWithWhitespace'));
  }

  if (ra && ra.length > 6) {
    return Promise.reject(ValidationError.build('Invalid.raLength'));
  }
}

export async function createStudent(parent, args, context, info) {
  const { name, email, cpf, ra } = args.input ?? {};

  await Promise.all([
    validateName(name),
    validateEmail(email),
    validateCpf(cpf),
    validateRa(ra),
  ]);

  return null;
}
