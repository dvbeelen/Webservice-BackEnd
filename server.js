//Requirements.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Connect to the database.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

//Logging when db is opened or errors occur. 
db.on('error', (error) => console.error(error));
db.once('open', (error) => console.log('Connected to database succesfully.'));

app.use(express.json());

const casesRouter = require('./routes/cases');
app.use('/cases', casesRouter);

app.listen(8000, () => console.log("Server started."));
