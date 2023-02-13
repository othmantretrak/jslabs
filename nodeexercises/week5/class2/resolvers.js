import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
  users: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.collection, {}, {});
  },
  userbyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { name: args.name });
  },
  adduser: async (args) => {
    let db = await dbRtns.getDBInstance();
    let user = { name: args.name, age: args.age, email: args.email };
    let results = await dbRtns.addOne(db, cfg.collection, user);
    console.log({ insertedCount: results });
    return results.acknowledged ? user : null;
  },
  //countries collections
  countries: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, "countries", {}, {});
  },
  countrybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, "countries", { name: args.name });
  },
  countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, "countries", { code: args.code });
  },
  addcountry: async (args) => {
    let db = await dbRtns.getDBInstance();
    let country = { name: args.name, code: args.code };
    let results = await dbRtns.addOne(db, "countries", country);
    console.log({ insertedCount: results });
    return results.acknowledged === true ? country : null;
  },
};
export { resolvers };
