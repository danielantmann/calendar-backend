//Auth Routes
//host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fields-validator");
const {
  createUser,
  revalidateToken,
  userLogin,
} = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],

  createUser
);

router.get("/renew", revalidateToken);

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  userLogin
);

module.exports = router;
