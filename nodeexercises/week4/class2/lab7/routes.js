import { Router } from "express";
import got from "got";
import { ISOCOUNTRIES } from "./config.js";

import * as dbRtns from "./db_routines.js";
const router = Router();
// define a default route
router.get("/", (req, res) => {
  res
    .status(200)
    .send({ msg: `this would be a response from the default route` });
});
// define a get route with a name parameter
router.get("/:code", async (req, res) => {
  let code = req.params.code;

  try {
    const db = await dbRtns.getDBInstance();
    //delete all countries
    await dbRtns.deleteAll(db, "countries");
    //Get countries Json
    const countiesArr = await got(ISOCOUNTRIES, {
      responseType: "json",
    }).json();
    const newCountiesArr = countiesArr.map((coutnryObj) => {
      return {
        name: coutnryObj.name,
        code: coutnryObj["alpha-2"],
      };
    });
    //ADD all countries to Database
    await dbRtns.addMany(db, "countries", newCountiesArr);
    let allRqCountries = await dbRtns.findAll(db, "countries", { code: code });
    // check if allRqCountries returned from database is not greater than 1
    if (allRqCountries.length < 1) {
      res
        .status(200)
        .send(`The code ${code} is not a known country alpha-3 code`);
    } else {
      res
        .status(200)
        .send(
          `The code ${code} belongs to the country of ${allRqCountries[0].name}`
        );
    }
  } catch (error) {
    console.log(err.stack);
    res.status(500).send(" internal server error");
  }
});
export default router;
