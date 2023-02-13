import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import got from "got";

import {
  currencyFormatter,
  fullNameAndProvincePromise,
  provinces,
  transferPaymentForProvincePromise,
  transferPaymentsFromWebPromise,
} from "./lab3_routines.js";
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

/* fullNameAndProvincePromise(argv.firstname, argv.firstname, argv.province).then(
  (gotData) => {
    transferPaymentsFromWebPromise().then((provCode) => {
      transferPaymentForProvincePromise(gotData, provCode).then((res) => {
        console.log(res);
      });
    });
  }
); */

const transferPaymentsPromise = async (provinceCode) => {
  let code = provinceCode.toLowerCase();
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

  try {
    const res = await got(srcAddr, { responseType: "json" });
    let payment = res.body.ccbf[code]["2022-2023"];
    return currencyFormatter(payment);
  } catch (error) {
    console.log(`Error ==> ${error}`);
  }
};

const paymentByProvince = (provCode) => {
  return provinces.map(async (prov) => {
    let payment = await transferPaymentsPromise(prov.code);

    return prov.code === provCode
      ? `\x1b[33m ${prov.name} had a transfer payment of ${payment} \x1b[0m`
      : `${prov.name} had a transfer payment of ${payment}`;
  });
};
const someAsyncFunction = async (firstname, lastname, provCode) => {
  try {
    let gotData = await fullNameAndProvincePromise(
      firstname,
      lastname,
      provCode
    );
    let payment = await transferPaymentsFromWebPromise(provCode);
    let res = await transferPaymentForProvincePromise(gotData, payment);
    console.log(res);

    console.log(`\nTransfer payments by province\n`);
    let statusArray = await Promise.allSettled(paymentByProvince(provCode));

    //statusArray.forEach((result) => console.log(result.status));
    //console.log(`\nresults from promise.allSettled with async/await\n`);
    statusArray.forEach((result) => {
      console.log(result.value);
    });
  } catch (error) {
    console.log(error);
  }
};
someAsyncFunction(argv.firstname, argv.firstname, argv.province);

///////////
/* const promiseAllSettledAsyncRtn = async (argArray) => {
  try {
    let statusArray = await Promise.allSettled(
      provinces.map((prov) => {
        return someAsyncFunction(
          argArray.firstname,
          argArray.firstname,
          prov.code
        );
      })
    );
   c
  } catch (err) {
    console.log(err.reverseresults);
  }
};
promiseAllSettledAsyncRtn(argv); */
