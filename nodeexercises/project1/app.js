"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
import cors from "@fastify/cors";
import { findAll, getDBInstance } from "./db_routines.js";
const app = Fastify();
app.register(cors, {});
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // web page for to test queries
});

const testFn = async () => {
  let db = await getDBInstance();
  let test = await findAll(db, "alerts", { region: "Europe" });
  console.log(test);
};
testFn();

app.listen({ port: cfg.port });
