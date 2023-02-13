import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { countries, isoCountries } from "./config.js";
import {
  fileStatsFromFSPromise,
  getJSONFromWWWPromise,
  readFileFromFSPromise,
  writeFileFromFSPromise,
} from "./iso_country_routines.js";

const argv = yargs(hideBin(process.argv))
  .option("refresh", {
    alias: "ref",
    describe: "is afresh copy from the web required?",
    type: "boolean",
  })
  .help()
  .alias("help", "h")
  .parse();

//console.log(argv.refresh);

const someAsyncFunction = async (firstname, lastname, provCode) => {
  //let coutryJson;
  const stats = await fileStatsFromFSPromise(countries);
  if (argv.refresh || !stats) {
    let coutryJson = await getJSONFromWWWPromise(isoCountries);
    await writeFileFromFSPromise(countries, coutryJson);
    const stats = await fileStatsFromFSPromise(countries);
    console.log(`${countries} was created at ${stats.ctime}`);
    console.log(`there are  ${stats.blocks} codes in ${countries}`);
  } else {
    const rowData = await readFileFromFSPromise(countries);
    const stats = await fileStatsFromFSPromise(countries);
    //console.log(rowData.toString().length);
    console.log(`An existing ${countries} file was read from the file system`);
    console.log(`${countries} was created on ${stats.ctime}`);
    console.log(`there are  ${stats.blocks} codes in ${countries}`);

    //console.log(rowData.toString());
  }
};
someAsyncFunction();
