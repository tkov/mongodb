# mongodb
Files pertaining to MongoDB. 

- mongoDb Client
- **mongoose** ORM


## mongoose

`npm install mongoose`

Connecting to MongoDB

- For one database: `mongoose.connect`
- For multiple databases `mongoose.createConnection(...)`

`await mongoose.connect('mongodb://localhost/database_name');`

`await mongoose.connect('mongodb://127.0.0.1/database_name'); // if above does NOT work`


```js
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// init app & middleware
const app = express()

// database connection
connectToDb((err) => {
    // if connection was successful...
    if (!err) {
        console.log('Connected!')
        app.listen(3000, () => {
            console.log('app listening on port 3000...')
        })
        db = getDb()
    }
})
```
