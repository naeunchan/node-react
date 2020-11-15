const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://naeunchan:abcd1234@cluster0.bljp6.mongodb.net/cluster0?retryWrites=true&w=majority",   
    {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))


app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log("complete"));