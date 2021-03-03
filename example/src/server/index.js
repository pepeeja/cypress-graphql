const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    books: [Book]
  }

  type Book {
    id: ID
    author: String
    title: String
  }
`);

const BOOKS = [
  { id: 1, title: 'Foo', author: 'John Doe' },
  { id: 2, title: 'Bar', author: 'Jane Doe' },
];

// The root provides a resolver function for each API endpoint
const root = {
  books: () => {
    return BOOKS;
  },
};

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
  }),
);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
