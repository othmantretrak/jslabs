import got from "got";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as dbRtns from "./db_routines.js";
import { ISOCOUNTRIES } from "./config.js";

const argv = yargs(hideBin(process.argv))
  .option("code", {
    describe: "Get the country name by code",
    type: "string",
  })
  .help()
  .alias("help", "h")
  .parse();

const someAsyncFunction = async (firstname, lastname, provCode) => {
  const countiesArr = await got(ISOCOUNTRIES, { responseType: "json" }).json();
  //console.log(countiesArr);
  try {
    const db = await dbRtns.getDBInstance();
    const newCountiesArr = countiesArr.map((coutnryObj) => {
      return {
        name: coutnryObj.name,
        code: coutnryObj["alpha-2"],
      };
    });
    await dbRtns.addMany(db, "countries", newCountiesArr);

    let count = await dbRtns.count(db, "countries");
    console.log(
      `there are currently ${count} documents in the countries collection`
    );

    // clean out collection before adding new users
    let results = await dbRtns.deleteAll(db, "countries");
    console.log(
      `deleted ${results.deletedCount} documents from countries collection`
    );
    results = await dbRtns.addMany(db, "countries", newCountiesArr);
    console.log(
      `there are now ${results.insertedCount} documents in the countries collection`
    );
    let allRqCountries = await dbRtns.findAll(
      db,
      "countries",
      { code: argv.code } // only have addresses contain a j - criteria
    );
    if (allRqCountries.length < 1) {
      console.log(`The code ${argv.code} is not a known country alpha-3 code`);
    } else {
      console.log(
        `The code ${argv.code} belongs to the country of ${allRqCountries[0].name}`
      );
    }
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
someAsyncFunction();
