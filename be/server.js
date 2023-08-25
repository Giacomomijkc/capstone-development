const express = require("express");
const mongoose = require("mongoose");
const PORT = 5050;

require('dotenv').config();

const designersRoute = require('./routes/designers');
const projectsRoute = require('./routes/projects');

const app = express();


app.use(express.json());

app.use('/', designersRoute);
app.use('/', projectsRoute);

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Server Connection Error!'));
db.once('open', () => {
    console.log('Database MongoDB connected!')
});



app.listen(PORT, () =>
    console.log(`Server avviato ed in ascolto sulla PORTA ${PORT}`)
);