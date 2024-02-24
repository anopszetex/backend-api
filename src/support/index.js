export function __dirname(relativePath) {
  return new URL('.', relativePath).pathname;
}
