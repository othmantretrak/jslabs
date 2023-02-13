import { ALERTCOLLECTION, GOCALERTS, ISOCOUNTRIES } from "./config.js";
import { getJSONFromWWWPromise } from "./utilities.js";
import * as dbRtns from "./db_routines.js";

const loadAlerts = async () => {
  const db = await dbRtns.getDBInstance();
  let results = "";
  // clean out collection before adding new countries
  let alerts = await dbRtns.deleteAll(db, ALERTCOLLECTION);
  results += `deleted ${alerts.deletedCount} documents from ${ALERTCOLLECTION} collection`;

  const alertJson = await getJSONFromWWWPromise(GOCALERTS);
  results += "Retrieved Alert JSON from remote web site.";
  const ISOCountries = await getJSONFromWWWPromise(ISOCOUNTRIES);
  results += "Retrieved Country JSON from GitHub.";
  let resultAlert = ISOCountries.map((country) => {
    let countryCode = country["alpha-2"];
    //console.log(countryCode);
    if (!alertJson.data[countryCode]) {
      return {
        country: countryCode,
        name: country.name,
        text: "No travel alerts",
        date: "",
        region: country.region,
        subregion: country["sub-region"],
      };
    }
    return {
      country: countryCode,
      name: country.name,
      text: alertJson.data[countryCode].eng["advisory-text"],
      date: alertJson.data[countryCode]["date-published"].date,
      region: country.region,
      subregion: country["sub-region"],
    };
  });

  let resultCountries = await dbRtns.addMany(db, ALERTCOLLECTION, resultAlert);
  results += `Added ${resultCountries.insertedCount} documents to the ${ALERTCOLLECTION} collection`;
  console.log(results);
  return { results: results };
};
//loadAlerts();
export { loadAlerts };
