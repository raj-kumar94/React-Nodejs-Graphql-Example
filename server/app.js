const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/graphql', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
    console.log('connected to DB');
}); 

const app = express();

const port = process.env.port || 4000;

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(port, function() {
    console.log(`listening to port ${port}`);
});