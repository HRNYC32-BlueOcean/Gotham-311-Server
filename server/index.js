const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require('dotenv').config();
const { typeDefs } = require('./schema/typeDefs.js');
const { resolvers } = require('./schema/resolvers.js');
const db = require('../db');

const { PORT } = process.env;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  // context: ({ req }) => {
  //   // get the user token from the headers
  //   const token = req.headers.authorization || '';

  //   // try to retrieve a user with the token
  //   const user = getUser(token);

  //   // optionally block the user
  //   // we could also check user roles/permissions here
  //   if (!user) throw new AuthenticationError('you must be logged in');

  //   // add the user to the context
  //   return { user };
  // },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);

// server.listen({ port: PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
