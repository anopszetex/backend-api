const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const REGEX_REMOVE_SPECIAL_CHARS = /\.|-/g;
const REGEX_FORMAT_CPF = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

export function isValidFormat(cpf) {
  return REGEX_FORMAT_CPF.test(cpf);
}

export function sanitizeCpf(cpf) {
  return String(cpf).replace(REGEX_REMOVE_SPECIAL_CHARS, '');
}
