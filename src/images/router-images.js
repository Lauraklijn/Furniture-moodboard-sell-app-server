const { Router } = require("express");
const Image = require("../images/model-images");

const router = new Router();

router.get("/images", (req, res, next) => {
  Image.findAll()
    .then(tickets => {
      res.send(tickets);
    })
    .catch(next);
});

//create image
router.post("/images", async (request, response, next) => {
  console.log("create image...!!!!!!!!!!!!!!!!", request.body);
  try {
    const newImage = await Image.create(request.body);
    response.send(newImage);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
