import got from "got";
const provinces = [
  { code: "NS", name: "Nova Scotia" },
  { code: "NL", name: "Newfoundland" },
  { code: "NB", name: "New Brunswick" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "ON", name: "Ontario" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "NT", name: "North West Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon Territory" },
];
const transferPaymentsFromWebPromise = (provinceCode) => {
  let code = provinceCode.toLowerCase();
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
  return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
      .then((response) => {
        let ont = response.body.ccbf[code]["2022-2023"];
        resolve(`It received ${currencyFormatter(ont)} in transfer payments.`);
      })
      .catch((err) => {
        console.log(`Error ==> ${err}`);
        reject(err);
      });
  });
};
const fullNameAndProvincePromise = (fname, lname, provice) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < provinces.length; i++) {
      if (provinces[i].code == provice) {
        resolve(`${fname}, ${lname} lives in ${provinces[i].name}`);
      }
    }
  });
};

const transferPaymentForProvincePromise = (gotData, provCode) => {
  return new Promise((resolve, reject) => {
    resolve(`${gotData}. ${provCode}`);
  });
};
const FISCALYEAR = "2022-2023";
// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(numberToFormat);
export {
  currencyFormatter,
  transferPaymentForProvincePromise,
  transferPaymentsFromWebPromise,
  fullNameAndProvincePromise,
  provinces,
};
