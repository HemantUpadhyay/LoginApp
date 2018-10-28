var mongoClient = require('mongodb').MongoClient;

const url = process.env['url'];

const dbName = 'MyLoginAppDB';

const connect = mongoClient.connect(url, function(err, client){
    console.log('Connected successfully to server...!!!');
    global.db = client.db(dbName);
});

module.exports =
{
    connect,
    Users:require('../DAL/user.module')
};