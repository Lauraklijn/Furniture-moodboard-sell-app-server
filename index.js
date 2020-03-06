const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

// const cors = require("cors");
// const corsMiddleWare = cors();
// app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const imageRoutes = require("./src/images/router-images");

app.use(imageRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
