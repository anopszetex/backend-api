import Fastify from "fastify";
import mercurius from "mercurius";

const fastify = Fastify({ logger: true });

function getBooks() {
  return [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger" },
    {
      id: 6,
      title: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
    },
    { id: 7, title: "Moby-Dick", author: "Herman Melville" },
    { id: 8, title: "War and Peace", author: "Leo Tolstoy" },
    { id: 9, title: "The Odyssey", author: "Homer" },
    { id: 10, title: "The Divine Comedy", author: "Dante Alighieri" },
  ];
}

const typeDef = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }
`;

const resolvers = {
  Query: {
    books: async () => {
      return getBooks();
    },
  },
};

// Declare a route
fastify.get("/books", (req, reply) => {
  reply.send(getBooks());
});

fastify.register(mercurius, {
  schema: typeDef,
  resolvers: resolvers,
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
