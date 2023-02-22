const schema = ` 
type Query {
    project1_setup: Results,
    countries: [Country],
 countrybyname(name: String): Country
    alerts:[Alert]
    advisories:[Advisory]
    advisoryByName(name: String):[Advisory]
    regions:[String]
    subregions:[String]
    alertsforregion(region: String): [Alert]
    alertsforsubregion(subregion: String): [Alert]
 },
type Results {
    results: String
 } 
type Country {
   name: String
   code: String
   } 
type Mutation {
      addadvisory(name: String, country: String, text: String,date: String): Advisory
      
     }
 type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
   }
   type Advisory {
      country: String
      name: String
      text: String
      date: String
      region: String
      subregion: String
     }
   


`;
export { schema };
