
const MongoClient = require('mongodb').MongoClient;
function connectClient() {
   MongoClient.connect(process.env.url, { useNewUrlParser: true }, function (err, client) {
      if (err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
      }
      console.log('Connected...');
      const db = client.db("NewsOnTap")
      // perform actions on the collection object
      global.db = db;
   });
}

module.exports = connectClient;