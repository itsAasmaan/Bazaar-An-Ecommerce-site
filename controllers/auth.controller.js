const User = require("../models/user.models");
const authUtils = require("../utils/authentication");
const validationUtils = require("../utils/validation");
const { getSessionData, flashDataToSession } = require("../utils/sessionFlash");

function getSignup(req, res) {
  let sessionData = getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      name: "",
      street: "",
      pincode: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
}

const signup = async (req, res, next) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    name: req.body.fullname,
    street: req.body.street,
    pincode: req.body.pincode,
    city: req.body.city,
  };

  if (
    !validationUtils.validateUserData(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.pincode,
      req.body.city
    ) ||
    !validationUtils.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    flashDataToSession(
      req,
      {
        errorMessage: "Please check your input...",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.pincode,
    req.body.city
  );

  try {
    const exisitingUser = await user.existsInDatabase();
    if (exisitingUser) {
      flashDataToSession(
        req,
        {
          errorMessage: "User exists already! Try logging in instead!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let exisitingUser;
  try {
    exisitingUser = await user.userExist();
  } catch (error) {
    next(error);
    return;
  }

  const sessionError = {
    errorMessage: "Please check your email and password!",
    email: user.email,
    password: user.password,
  };

  if (!exisitingUser) {
    flashDataToSession(req, sessionError, function () {
      res.redirect("/login");
    });
    return;
  }

  const correctPassword = await user.comparingPassword(exisitingUser.password);

  if (!correctPassword) {
    flashDataToSession(req, sessionError, function () {
      res.redirect("/login");
    });
    return;
  }

  authUtils.createUserSession(req, exisitingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtils.removeUserSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};