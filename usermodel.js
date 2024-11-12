const { name } = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;
mongoose.connect(MONGO_DATABASE_URL)
// mongoose.connect('mongodb://127.0.0.1:27017/test');

const userModelSchema = mongoose.Schema({
    name : String,
    age : Number
})

module.exports = mongoose.model("user", userModelSchema)