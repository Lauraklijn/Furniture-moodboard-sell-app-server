const { Router } = require("express");
const Product = require("../products/model-product");

const router = new Router();

router.get("/userprofile/:id/products", (req, res, next) => {
  Product.findAll({
    where: { userId: req.params.id }
  })
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

router.post("/userprofile/:id/products", (req, res, next) => {
  console.log("REQUEST!!!!!!!!!!!!!!!!!!!!!!!", req.body);

  Product.create({ ...req.body, userId: req.params.id })
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

module.exports = router;
