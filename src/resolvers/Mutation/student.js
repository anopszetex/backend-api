import { ValidationError } from '../../support/errors.js';

export async function createStudent(parent, args, context, info) {
  const { name } = args.input ?? {};

  if (!name) {
    return Promise.reject(ValidationError.build('Invalid.name'));
  }

  if (!name.trim()) {
    return Promise.reject(ValidationError.build('Invalid.whitespace'));
  }

  if (name.length > 100) {
    return Promise.reject(ValidationError.build('Invalid.length'));
  }

  return null;
}
