import { ValidationError } from '../../support/errors.js';

export async function createStudent(parent, args, context, info) {
  const { name } = args.input ?? {};

  if (!name.trim()) {
    return Promise.reject(ValidationError.build('Invalid.whitespace'));
  }

  return null;
}
