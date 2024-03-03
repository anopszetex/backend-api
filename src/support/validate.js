const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}
