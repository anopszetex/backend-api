import { ValidationError, isValidEmail } from '../../support/index.js';

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

export async function createStudent(parent, args, context, info) {
  const { name, email, cpf } = args.input ?? {};

  await Promise.all([validateName(name), validateEmail(email)]);

  if (!cpf) {
    return Promise.reject(ValidationError.build('Invalid.cpf'));
  }

  if (!cpf.trim()) {
    return Promise.reject(ValidationError.build('Invalid.cpfWithWhitespace'));
  }

  return null;
}
