import * as queries from './queries.js';
import * as mutations from './mutations.js';

const resolvers = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
};

export default resolvers;
