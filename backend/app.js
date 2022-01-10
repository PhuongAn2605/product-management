const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');

// const dotenv = require("dotenv")
// dotenv.config()

const app = express();

app.use((req, res, next) => {
    const error = new HttpError('Could not find the route', 404);
    throw error;
})

const MONGO_URL = `mongodb://localhost:27017/product-management`;
mongoose.connect(MONGO_URL).then(() => {
    app.listen(process.env.PORT || 5000);
}).then(() => {
    console.log('Connected to db!')
}).catch(err => {
    console.log(err);
})