# MongoDB Tutorial
- a database

## Documents
- similar to JSON or Javascript objects
```
{
  "title": "Name of the Wind",
  "rating": 9,
  "pages": 400,
}
```

- Multiple Collections

```
[
  {
    "title": "The Final Empire",
    "author": "Brandon Sanderson",
    "pages": 450,
    "genres": ["Fantasy", "Dystopian"],
    "rating": 8    
  },
  {
    "title": "The Way of Kings",
    "author": "Brandon Sanderson",
    "pages": 350,
    "genres": ["Fantasy", "Dystopian"],
    "rating": 9    
  },
  {
    "title": "The Call of the Weird",
    "author": "Louis Theroux",
    "pages": 350,
    "genres": ["Non-Fiction", "Strange", "Comedy"],
    "rating": 7    
  }   
]
```

## Using the Shell

### Inserting Documents

```bash
# showing a collection
db.books
> db.books
# adding a document
db.books.insertOne({title: "The Color of Magic", author: "Terry Pratchett", pages: 300, rating: 7, genres: ["Fantasy", "Magic"]})

# creating a document in an `authors` collection (whether it exists or not)
db.authors.insertOne({name: "Brandon Sanderson", age: 46})

# add multiple documents
db.books.insertMany([# an array of `objects` (documents)])
db.books.insertMany([{title: "The Light Fantastic", author: "Terry Pratchett", pages: 250, rating: 6, genres: ["Fantasy"]},{title: "Dune", author: "Frank Herbert", pages: 500, rating: 10, genres: ["Sci-Fi", "Dystopian"]}])


```

### Finding Documents

```bash
db.books.find() # will show all available
# documents (first 20)
it # iterate to the next "batch"

# finds all objects that have the specified author
db.books.find({author: "Brandon Sanderson"})

# we can pass a second argument (an object)
# to filter the returned values
db.books.find({author: "Brandon Sanderson"}}, { title: 1, author: 1})

# .findOne() method returns a single document
```

### Sorting & Limiting Data

```bash
# counts all returned documents
db.books.find().count()

# limit the number of returned documents
db.books.find().limit(3) 

# sort results (which field to sort by)
# 1: is ascending/alphabetical; -1 is descending
db.books.find().sort({title: 1})
```
### Operators & Complex Queries
- all operators begin with a dollar sign (`$`)

- the `$gt/$gte` and `$lt/$lte` operators are comparison operators

```bash
db.books.find({pages: {$gt: 350}})
```

- the `$or` operator references an array, which takes multiple queries inside of objects 
```bash
# match a document with a rating of 7 OR 9
db.books.find({$or: [{rating: 7}, {rating: 9}]})
```

### Using $in & $nin

- the `$in` operator checks if the specified key corresponds to any of the values in the given array and returns documents that match that criteria
- the `$nin` operator is similar, but checks of the value of the key is **not** in the specified array and returns documents accordingly 
```bash
db.books.find({rating: { $in: [7,8,9]}})

db.books.find({rating: { $nin: [1,2,3,4,5]}})
```

### Deleting Documents

- `deleteOne({_id: ...})` deletes a single document 
  >  use id as it guarantees a unique document

- `deleteMany({})` deletes multiple documents
```bash
# deletes all documents where the author is 'Terry Pratchett'
db.books.deleteMany({author: "Terry Pratchett"})
```

### Updating Documents

- use the `_id` property to update documents
- the `updateOne()` method will update the document
- 

```bash
# a single field updated
db.books.updateOne({_id: ObjectId("...")}, {$set: {rating: 8}})

# multiple fields updated
db.books.updateOne({_id: ObjectId("...")}, {$set: {rating: 8, pages: 350}})
```

### Indexing

```bash
db.books.createIndex({ rating: 8 })
rating_8

# show indexes
db.books.getIndexes()
```

```bash
db.books.find({ rating: 8 }).explain('executionStats')
```
