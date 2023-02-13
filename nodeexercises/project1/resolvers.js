import { findAll, findUniqueValues, getDBInstance } from "./db_routines.js";
import { loadAlerts } from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {
    //return { results: "hello" };
    return await loadAlerts();
  },
  alerts: async () => {
    let db = await getDBInstance();
    return await findAll(db, "alerts");
  },
  alertsforregion: async (args) => {
    let db = await getDBInstance();
    return await findAll(db, "alerts", { region: args.region });
  },
  alertsforsubregion: async (args) => {
    let db = await getDBInstance();
    return await findAll(db, "alerts", { subregion: args.subregion });
  },
  regions: async () => {
    let db = await getDBInstance();
    return await findUniqueValues(db, "alerts", "region");
  },
  subregions: async () => {
    let db = await getDBInstance();
    return await findUniqueValues(db, "alerts", "subregion");
  },
};
export { resolvers };
