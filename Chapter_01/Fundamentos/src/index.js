const express = require("express");

const app = express();

app.listen(process.env.PORT || 3333, ()=>{
    console.log("Server started");
})

app.get('/courses', (req, res)=>{
    const query = req.query;
    console.log(query);
    return res.json(['Node.js', 'React.js', 'React Native']);
})

