//connect our config.env
require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middleware/error');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

mongoose.set('strictQuery', true);

//connect our database using Promises
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        const port = process.env.PORT || 4242;
        //connect our routes
        app.use('/api/auth', require('./routes/auth'));
        app.use(ErrorHandler)

        app.listen(port, () => {
            console.log('Server is running on port ' + port)
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
