require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    routes = require('./routes');

const app = express(),
    port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/profilr-generator', { useNewUrlParser: true });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(port, function() {
    console.log(`Server is running in port ${port}... `);
})