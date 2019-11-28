require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log('Connected to database succesfully.'));


app.listen(3000, () => console.log("Server started."));
