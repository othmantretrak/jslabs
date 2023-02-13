const schema = ` 
type Query {
 users: [User],
 userbyname(name: String): User
 countries: [Country],
 countrybyname(name: String): Country
 countrybycode(code: String): Country
 },
type User {
 name: String
 age: Int
 email: String
 } 
 type Mutation {
    adduser(name: String, age: Int, email: String): User
    addcountry(name: String, code: String): Country
   }

type Country {
    name: String
    code: String
    } 
`;
export { schema };
