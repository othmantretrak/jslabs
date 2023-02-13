import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { fullNameAndProvincePromise, provinces, transferPaymentForProvincePromise, transferPaymentsFromWebPromise } from "./lab2_routines.js";
const codeChoices = provinces.map((p) => p.code);

// Note: hideBin is a shorthand for process.argv.slice(2)
//       - bypass the first two arguments
const argv = yargs(hideBin(process.argv))
  .options({
    firstname: {
      demandOption: true,
      alias: "fname",
      describe: "Resident’s first name",
      string: true,
      required: true,
    },
    lastname: {
      demandOption: true,
      alias: "lname",
      describe: "Resident’s last name",
      string: true,
      required: true,
    },
    province: {
      demandOption: true,
      alias: "prov",
      describe: "Resident’s home province",
      string: true,
      required: true,
      choices: codeChoices,
    },
  })
  .help()
  .alias("help", "h")
  .parse();

fullNameAndProvincePromise(argv.firstname, argv.firstname, argv.province).then(
  (gotData) => {
    transferPaymentsFromWebPromise().then((provCode) => {
      transferPaymentForProvincePromise(gotData, provCode).then((res) => {
        console.log(res);
      });
    });
  }
);
