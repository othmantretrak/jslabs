import { config } from "dotenv";
config();
export const GOCALERTS = process.env.GOCALERTS;
export const ISOCOUNTRIES = process.env.ISOCOUNTRIES;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const ALERTCOLLECTION = process.env.ALERTCOLLECTION;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;
