const {gql} = require('apollo-server-express');

/*
input bookInput {
        authors: [String!]
        description: String
        title: String
        bookId:ID!
        image: String!
        link: String!
    }
*/
const typeDefs = gql`
    input bookInput {
        authors: [String!]
        description: String
        title: String!
        bookId:ID!
        image: String
        link: String
    }
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int!
        savedBooks: [Book!]
    }

    type Book {
        _id: ID!
        authors:[String!]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!

    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users:[User]
        me:User
    }
    type Mutation{
        addUser(username:String!, email:String!, password:String!): Auth
        login(email:String!, password:String!):Auth
        saveBook(input:bookInput): User
        
        removeBook(bookId: ID!): User
    }


`;
//saveBook(input:bookInput): User
module.exports = typeDefs;

//savebook takes in description, title, bookId, image, and link,
//returns User type

//removeBook: accepts a bookId, returns User type

/*
mutation loginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
       	user{
          _id
          email
          savedBooks{
            title
          }
        }
        token
      } 
}

{
      "email":"lernantino@techfriends.dev",
  	"password":"password10"
    }
*/
/*
mutation addUserMutation($username:String!,$email: String!, $password: String!) {
    addUser(username:$username,email: $email, password: $password) {
       	user{
          _id
          email
          
        }
        token
      } 
    }

{
  "username": "roberty",
      "email":"roberty@gmail.com",
  	"password":"password10"
    }
*/

/*
mutation saveBook($bookInput: bookInput!) {
    saveBook(input:$bookInput) {
       	username
        savedBooks{
          title
        }
      } 
    }
        {
    }


{
  "bookInput": {
    "title":"The Prime of Miss Jean Brodie",
    "bookId": "c2ecfuG-GH8C",
            "authors": [
              "Jay Prissori",
              "Jay Presson Allen",
              "Muriel Spark"
            ]
    
    }  
}
*/
