const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');

const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const commentRouter = require('./routes/comment.routes');
const commentLikeRouter = require('./routes/commentLike.routes');
const replyRouter = require('./routes/reply.routes');


const bodyParser = require('body-parser');


// const dotenv = require("dotenv")
// dotenv.config()

const app = express();
app.use(bodyParser.json());


app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/comment', commentRouter);
app.use('/api/comment-like', commentLikeRouter);
app.use('/api/reply', replyRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find the route', 404);
    throw error;
});

const MONGO_URL = `mongodb://localhost:27017/product-management`;
mongoose.connect(MONGO_URL).then(() => {
    app.listen(process.env.PORT || 5000);
}).then(() => {
    console.log('Connected to db!')
}).catch(err => {
    console.log(err);
})