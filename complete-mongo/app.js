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



// routes
app.get('/books', (req, res) => {
    // pagination #23
    const page = req.query.p || 0
    // number of books per page
    const booksPerPage = 3

    
    let books = []
    db.collection('books')
        .find()  // cursor objects (toArray, forEach)
        .sort({ author: 1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))  // asynchronous
        .then(() => {
           return res.status(200).json(books)
        })
        .catch(() => {
            return res.status(500).json({error: 'Could not fetch the documents'})
        });

    // res.json({ msg: "Welcome to the API"});
})

app.get('/books/:id', (req, res) => {
    
    if( ObjectId.isValid(req.params.id)){
        // if the id string is valid...
        db.collection('books')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                return res.status(200).json(doc)
            })
            .catch(err => {
                return res.status(500).json({error: 'Could not fetch the document'})
            })
    }
    else {
        return res.status(500).json({error: 'Not a valid document ID.'})
    }

    // req.params.id // gets value of :id
})

app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
        .insertOne(book)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            return res.status(500).json({error: 'Could not create a new document'})
        })
})


app.delete('/books/:id', (req, res) => {
    
    if( ObjectId.isValid(req.params.id)){
        // if the id string is valid...
        db.collection('books')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return res.status(500).json({error: 'Could not delete the document'})
            })
    }
    else {
        return res.status(500).json({error: 'Not a valid document ID.'})
    }
})

app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    if( ObjectId.isValid(req.params.id)){
        // if the id string is valid...
        db.collection('books')
            .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return res.status(500).json({error: 'Could not update the document'})
            })
    }
    else {
        return res.status(500).json({error: 'Not a valid document ID.'})
    }
})