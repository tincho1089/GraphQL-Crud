import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
const dbContext = process.argv[2] == 'mongodb' ? 'mongodb' : 'localhost';
async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });

  mongoose.connect(`mongodb://${dbContext}:27017/myapp`);
  
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
