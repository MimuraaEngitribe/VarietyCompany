const { ApolloServer, gql} = require("apollo-server")

const companies = [
    {
        id: 1,
        name: "StaticCompany"
    },
    {
        id: 2,
        name: "企業2"
    }
];

const typeDefs = gql`
    type Company {
        id: Int!
        name: String
    },
    type Query{
        getCompanies: [Company]
    }
`;

const resolvers = {
    Query: {
        getCompanies: () => companies,
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
})