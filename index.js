const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const imageRoutes = require("./src/images/router-images");
const userRoutes = require("./src/user/router-user");
const productRoutes = require("./src/products/router-product");

app.use(imageRoutes);
app.use(userRoutes);
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
