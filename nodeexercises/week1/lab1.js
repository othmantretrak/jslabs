// Load the got module
import got from "got";

// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
  const srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

  // Create a currency formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  try {
    const FISCALYEAR = '2022-2023';
    const response = await got(srcAddr, { responseType: "json" });
    //  strip out the Ontario amount
    let bc = response.body.ccbf.bc[FISCALYEAR];
    let al = response.body.ccbf.ab[FISCALYEAR];
    console.log(`Alberta’s transfer amount for ${FISCALYEAR} was ${formatter.format(al)}`);
    console.log(`B.C.’s transfer amount for ${FISCALYEAR} was ${formatter.format(bc)}`);
    let difference;
    if(bc > al){
      difference = bc-al;
      console.log(`B.C. received ${formatter.format(difference)} more than Alberta for ${FISCALYEAR}.`);
    } else{
      difference = al-bc;
      console.log(`Alberta received ${formatter.format(difference)} more than B.C. for ${FISCALYEAR}.`);
    }
    // format to currency
    
    
    // dump to the console using template literal
    
    
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }
};
dumpJson();
