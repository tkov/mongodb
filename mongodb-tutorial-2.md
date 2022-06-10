#MongoDB Tutorial 2

`sudo apt-get install mongodb`

`sudo service mongodb status`

`sudo service mongodb start`

## Driver Install
`npm i mongodb`

```js
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;
```


- `listCollections()`: lists availbel collections (tables) in a database



-`find()`: creates a cursor for a query that can be used to iterate over results



-`count()`: returns the number of matching documents in the collection

```js
db.collection('cars').find({}).count().then((n) => // passing {} into find() returns all documents
{
    console.log(`There are ${n} documents`);
}).catch((err) => {
    console.loge(err);
}).finally(() => {
    client.close();
})
```


-`insertOne({...})`: inserts a single document (row) into a collection (table); takes in an object as an argument

-`insertMany([{...},{...},{...}])`: inserts multiple documents (row) into a collection (table); takes in an array of objects as an argument


-`deleteOne(query)`: deletes a document

```js
let query = { name: "Volkswagen" };
db.collection('cars').deleteOne(query).then((result) => {
    //...
}).catch((err) => {
    //... handle errors
}).finally(() => {
    client.close();
})
```

- `updateOne(filterQuery, updateQuery)`: updates a document; the $set operator is used to change the price

```js
let filterQuery = { name: "Audi" }  // matches document with name attribute
let updateQuery = { $set: { "price": 52000 }}; // changes the price attribute of the "Audi"

db.collection('cars').updateOne(filterQuery, updateQuery).then((result) => {
    // handle result
}).catch((err) => {
    // handle error(s)
}).finally(() => {
    client.close();
});
```
