/**
 * Created by diam on 04/08/19.
 */

const express = require('express');
const router = express.Router();
const expressGraphQl = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

// sample data
const authors = [
    {id: 1, name: 'J. K. Rowling'},
    {id: 2, name: 'J. R. R. Tolkien'},
    {id: 3, name: 'Brent Weeks'}
];

const books = [
    {id: 1, name: 'Harry Porter and the chamber of Secrets', authorId: 1},
    {id: 2, name: 'Harry Porter and the Prisoner of Azkaban', authorId: 1},
    {id: 3, name: 'Harry Porter and the Goblet of fire', authorId: 1},
    {id: 4, name: 'The fellowship of the ring', authorId: 2},
    {id: 5, name: 'The two towers', authorId: 2},
    {id: 6, name: 'The return of the king', authorId: 2},
    {id: 7, name: 'The way of the shadows', authorId: 3},
    {id: 8, name: 'Beyond the shadows', authorId: 3}
];

// BookType Data
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'The represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book, args) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
});

// AuthorType Data
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'The represents an Author of the book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author, args) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
});

// Query for this graphql
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        message: {
            type: GraphQLString,
            description: "Greeting message",
            args: {
                name: { type : GraphQLString}
            },
            resolve: (parent, args) => {
                if (args.name) {
                    return `Hello, ${args.name}!!!!`
                } else {
                    return "Hello, Rishabh Daim!!!!"
                }
            }
        },
        book: {
            type: BookType,
            description: 'A single Book',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all Books',
            resolve: (parent, args) => books
        },
        author: {
            type: AuthorType,
            description: 'A single Author',
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of all Authors',
            resolve: (parent, args) => authors
        }
    })
});

// mutator of this graphql
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a Book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                authorId: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId};
                books.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name};
                authors.push(author);
                return author;
            }
        }
    })
});

const schema = new GraphQLSchema({
     query: RootQueryType,
     mutation: RootMutationType
});

router.use('', expressGraphQl({
    graphiql: true,
    schema: schema
}));

// export this router to use in our bookAuthor.js
module.exports = router;