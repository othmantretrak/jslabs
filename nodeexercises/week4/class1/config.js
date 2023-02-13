import { config } from "dotenv";
config();
export const ISOCOUNTRIES = process.env.ISOCOUNTRIES;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
