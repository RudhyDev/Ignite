const express = require("express");

const app = express();

app.listen(process.env.PORT || 3333, ()=>{
    console.log("Server started");
})

app.get('/hello', (req, res) => {
    res.send("Hello World");
})