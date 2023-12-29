const express = require("express")
const PORT = 8000;
const { ApolloServer, gql} = require("apollo-server-express")
const { PrismaClient } = require("@prisma/client")

const typeDefs = gql`
    type Company {
        id: Int!
        name: String
    },
    type Query{
        getCompanies: [Company]
        getCompanyById(id: Int!): Company
        updateCompany(id: Int, name: String): Boolean
        deleteCompany(id: Int, name: String): Boolean
    }
`;

const resolvers = {
    Query: {
        getCompanies: (_) => {
            // ここでのidは、クエリから受け取った引数
            // idに基づいて、データベースから該当するデータを取得するロジックを記述
            return prisma.company.findMany();
        },
        getCompanyById: (_, { id }) => {
            return prisma.company.find({where: id});
        },
        updateCompany: (_, id, name) => {
            return prisma.company.create({
                data: {
                    id: id,
                    name: name
                }
            });
        },
        deleteCompany: (_, id) => {
            return prisma.company.delete({
                where: {
                  id: id
                },
              })
        }
    },
};

const server = new ApolloServer({typeDefs, resolvers});
const app = express();
const prisma = new PrismaClient();

// 非同期関数を作成
async function startApolloServer() {
    // サーバーを初期化
    await server.start();

    // ExpressアプリケーションにMiddlewareを適用
    server.applyMiddleware({ app });

    // Expressサーバーを開始
    app.listen({ port: PORT }, () => {
        console.log(`Server ready at http://localhost:${PORT}`);
    });
}

startApolloServer();
