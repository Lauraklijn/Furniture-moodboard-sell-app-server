const { Router } = require("express");
const { User, UserProfile } = require("./model-user");

const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/signup", async (request, response) => {
  if (!request.body.email || !request.body.password) {
    return response
      .status(400)
      .send("Missing email or password in request body");
  }

  const hashedPassword = bcrypt.hashSync(request.body.password, 10);

  try {
    const userData = await User.create({
      ...request.body,
      password: hashedPassword
    });

    //response.status(201).send("User created");
    response.status(201).json({
      message: "User Created",
      userAccount: { ...userData.dataValues }
    });
  } catch (error) {
    console.log(error.name);
    switch (error.name) {
      case "SequelizeUniqueConstraintError":
        return response.status(400).send({ message: "Email not unique" });

      default:
        return response.status(400).send("Baaaddd request");
    }
  }
});

router.post("/login", async (request, response) => {
  console.log(request.body);

  const user = await User.findOne({ where: { email: request.body.email } });

  const passwordValid = bcrypt.compareSync(
    request.body.password,
    user.password
  );

  if (passwordValid) {
    const token = toJWT({ id: user.id });

    return response.status(200).send({ token: token });
  }
});

//Creating userprofile
router.post("/userprofile/signup", async (request, response, next) => {
  try {
    console.log("CHECK REQUEST.BODY!!!!!!", request);
    //const newProfile = { ...req.body, Userid: req.user.dataValues.id };
    const userProfileResult = await UserProfile.create(request.body);

    response.json({
      message: "User Profile Created",
      userProfile: { ...userProfileResult.dataValues }
    });
  } catch (err) {
    next(err);
  }
});

router.get("/userprofile/:id", (req, res, next) => {
  console.log("TEST ID endpoint", req.params.id);
  UserProfile.findOne({ where: { userId: req.params.id } }, { include: [User] })
    .then(profile => {
      //ticket.dataValues.totalRisk = 9;
      res.send(profile);
    })
    .catch(next);
});

//findByPk(req.params.id, { include: [User] })

// const userProfileResult = await UserProfile.create(newProfile);
// res.status(201).send(userProfileResult);
// } catch (error) {
// next(error);
// }
// });

router.get("/userprofile", (req, res, next) => {
  UserProfile.findAll()
    .then(profile => {
      res.json(profile);
    })
    .catch(next);
});

module.exports = router;
