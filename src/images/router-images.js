const { Router } = require("express");
const Image = require("../images/model-images");

const router = new Router();

router.get("/", (req, res, next) => {
  Image.findAl()
    .then(image => {
      res.send(image);
    })
    .catch(next);
});

module.exports = router;
