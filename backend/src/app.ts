import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import config from "config";

import typeDefs from "./graphql/schemas/schema";
import resolvers from "./graphql/resolvers/OrderResolver";

const dbUri = config.get<string>("dbUri");
const port = config.get<string>("port");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(port, async () => {
  try {
    await mongoose.connect(dbUri, {
      bufferCommands: true,
    });

    console.log(`Server listening`);
  } catch (error) {
    console.log(error);
  }
});
