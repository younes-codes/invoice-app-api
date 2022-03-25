const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const fs = require("fs");
const path = require("path");
const app = express();
const invoicesRoutes = require('./routes/invoice');
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const clientRoutes = require('./routes/client');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lhdln.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());


const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access-loggin'),
    {flags: 'a'}
);

app.use('/invoice', invoicesRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/client', clientRoutes);


app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(e => console.log(e));
