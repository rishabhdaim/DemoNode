/**
 * Created by diam on 05/08/19.
 */

const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');


// 2
const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote
};

// 3
const server = new GraphQLServer({
    typeDefs: './express/graphql/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
});

server.start(() => console.log('Server is running on http://localhost:4000'));
