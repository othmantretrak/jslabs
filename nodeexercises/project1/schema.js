const schema = ` 
type Query {
    project1_setup: Results,
    alerts:[Alert]
    regions:[String]
    subregions:[String]
    alertsforregion(region: String): [Alert]
    alertsforsubregion(subregion: String): [Alert]
 },
type Results {
    results: String
 } 
 type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
   }
   


`;
export { schema };
