const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await jwtGenerator(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const revalidateToken = async (req = request, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await jwtGenerator(uid, name);

  res.json({
    ok: true,
    token: token,
  });
};

const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid username or password.",
    });
  }

  try {
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password.",
      });
    }

    const token = await jwtGenerator(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { createUser, revalidateToken, userLogin };
