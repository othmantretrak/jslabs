import { findAll, findUniqueValues, getDBInstance } from "./db_routines.js";
import { loadAlerts } from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {
    //return { results: "hello" };
    return await loadAlerts();
  },
};
export { resolvers };
