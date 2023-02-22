import {
  addOne,
  findAll,
  findOne,
  findUniqueValues,
  getDBInstance,
} from "./db_routines.js";
import { loadAlerts } from "./project1_setup.js";
const resolvers = {
  project1_setup: async () => {
    //return { results: "hello" };
    return await loadAlerts();
  },
  alerts: async () => {
    let db = await getDBInstance();
    let alerts = await findAll(db, "alerts", {}, {});
    console.log(
      "🚀 ~ file: resolvers.js:16 ~ alerts: ~ alerts:",
      alerts.length
    );
    return alerts;
  },
  addadvisory: async (args) => {
    let db = await getDBInstance();
    let advisory = {
      name: args.name,
      country: args.country,
      text: args.text,
      date: args.date,
    };
    let results = await addOne(db, "advisories", advisory);
    console.log({ insertedCount: results });
    return results.acknowledged ? advisory : null;
  },
  alertsforregion: async (args) => {
    let db = await getDBInstance();
    return await findAll(db, "alerts", { region: args.region });
  },
  alertsforsubregion: async (args) => {
    let db = await getDBInstance();
    return await findAll(db, "alerts", { subregion: args.subregion });
  },
  advisoryByName: async (args) => {
    let db = await getDBInstance();
    return await findAll(db, "advisories", { name: args.name });
  },
  regions: async () => {
    let db = await getDBInstance();
    return await findUniqueValues(db, "alerts", "region");
  },
  subregions: async () => {
    let db = await getDBInstance();
    return await findUniqueValues(db, "alerts", "subregion");
  },
  //countries collections
  countries: async () => {
    let db = await getDBInstance();
    let countries = await findAll(db, "countries", {}, {});
    return countries;
  },
  advisories: async () => {
    let db = await getDBInstance();
    let advisories = await findAll(db, "advisories", {}, {});
    return advisories;
  },
  countrybyname: async (args) => {
    let db = await getDBInstance();
    return await findOne(db, "countries", { name: args.name });
  },
};
export { resolvers };
