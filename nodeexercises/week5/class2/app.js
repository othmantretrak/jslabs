import { port } from "./config.js";
import { routes } from "./fastify_routes.js";
import Fastify from "fastify";
import { findAll, getDBInstance } from "./db_routines.js";
const fastify = Fastify({
  logger: true,
});
// register the route module
fastify.register(routes);

// start the fastify server
fastify.listen(port, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
