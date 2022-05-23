import express from 'express';

const app = express();

const port = process.env.PORT || 3333;
app.listen(3333, () => {
  console.log(`Server listening on port ${port}`);
})

app.get("/health", (req, res)=>{
  res.send("OK");
} );
