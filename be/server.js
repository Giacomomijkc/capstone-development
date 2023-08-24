const express = require("express");
const mongoose = require("mongoose");
const PORT = 5050;

const app = express();

// middleware
app.use(express.json());

// ultima riga
app.listen(PORT, () =>
    console.log(`Server avviato ed in ascolto sulla PORTA ${PORT}`)
);