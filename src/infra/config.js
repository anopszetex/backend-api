export const getDatabaseConfig = Object.freeze({
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT ?? 5432,
  DB_USER: process.env.DB_USER ?? 'root1',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'root1',
  DB_NAME: process.env.DB_NAME ?? 'students-dev',
});
