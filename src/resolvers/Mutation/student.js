import { ValidationError } from '../../support/errors.js';

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

export async function createStudent(parent, args, context, info) {
  const { name, email } = args.input ?? {};

  await validateName(name);

  if (!email) {
    return Promise.reject(ValidationError.build('Invalid.email'));
  }

  if (!email.trim()) {
    return Promise.reject(ValidationError.build('Invalid.emailWithWhitespace'));
  }

  return null;
}
