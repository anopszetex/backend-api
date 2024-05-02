import { ValidationError } from './errors.js';
import { isValidEmail, isValidFormat, sanitizeCpf } from './validate.js';

export function __dirname(relativePath) {
  return new URL('.', relativePath).pathname;
}

export { ValidationError, isValidEmail, isValidFormat, sanitizeCpf };
