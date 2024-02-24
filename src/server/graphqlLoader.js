import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import path from 'node:path';

import { __dirname } from '../support/index.js';

async function buildResolvers() {
  const resolversArray = await loadFiles(
    path.join(__dirname(import.meta.url), '../resolvers/**/index.js')
  );

  return mergeResolvers(resolversArray);
}

async function buildTypeDefs() {
  const typesArray = await loadFiles(
    path.join(__dirname(import.meta.url), '../schemas'),
    {
      extensions: ['graphql'],
    }
  );

  return mergeTypeDefs(typesArray);
}

export { buildResolvers, buildTypeDefs };
