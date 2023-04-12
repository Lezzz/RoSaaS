//connect our config.env
require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}
app.use(bodyParser.json({verify: rawBodySaver, extended: true }));

require('./routes')(app);

mongoose.set('strictQuery', true);

//connect our database using Promises
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        const port = process.env.PORT || 4242;
        app.use(express.json());
        
        app.use(ErrorHandler)

        app.listen(port, () => {
            console.log('Server is running on port ' + port)
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
