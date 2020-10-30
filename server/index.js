const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { typeDefs } = require('./schema/typeDefs.js');
const { resolvers } = require('./schema/resolvers.js');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
   
    // try to retrieve a user with the token
    const user = getUser(token);
   
    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthenticationError('you must be logged in'); 
   
    // add the user to the context
    return { user };
   },
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
