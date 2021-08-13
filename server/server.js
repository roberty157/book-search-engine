const express = require('express');

const {ApolloServer} = require('apollo-server-express');

const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');

const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/bookSearchDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, 
  }
)
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:authMiddleware,
})
server.applyMiddleware({app});

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  }
  );
});
