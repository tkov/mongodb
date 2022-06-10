const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    // connecting to a database...
    connectToDb: (callback) => {
        // a connection string (to our LOCAL databatse)
        // it returns a Promise
        MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
            .then((client) => {
                dbConnection = client.db()
                // a callback function to fire after we `try` to connect to
                // the database
                return callback()
            })
            .catch(err => {
                console.log(err)
                return callback(err)
            })
    },
    // return our database connection
    getDb: () => dbConnection
}