import { GraphQLServer } from "graphql-yoga";
//https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
import resolvers from "./resolvers/resolver";
import express from "express";
import path from "path";

const typeDefs = "src/schema/schema.graphql";

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(express.static(__dirname + "/../../front/build"));
server.express.get("/home", function (_, res) {
  res.sendFile(path.join(__dirname, "../../front/build/index.html"));
});
server.start({ port: 4001, endpoint: "/graphql" }, () =>
  console.log("Server is running on localhost:4001")
);
