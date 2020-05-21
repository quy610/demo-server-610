const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const bookRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// ROUTER
app.use('/books', bookRouter);
app.use('/api/user', authRouter);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.listen(port, () => {
    console.log('Server is running');
});