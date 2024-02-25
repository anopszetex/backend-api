import { buildConnectionConfig } from './src/infra/db/index.js';

export default function () {
  return { ...buildConnectionConfig() };
}
