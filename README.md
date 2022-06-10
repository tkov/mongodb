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
