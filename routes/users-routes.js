const express = require("express");
const {
  getUsers,
  validateUserExist,
  addNewUser,
  filterByCash,
  filterByCredit,
} = require("../data-massege/app.js");

const usersRoute = express.Router();

usersRoute.get("/", (req, res) => {
  try {
    res.status(200).send(getUsers());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/:id", (req, res) => {
  try {
    const users = getUsers();
    const user = validateUserExist(req.params.id, users);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.post("/", (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.passportId;
    const cash = parseFloat(req.body.cash) || 0;
    const credit = parseFloat(req.body.credit) || 0;
    addNewUser(name, id, cash, credit);
    const users = getUsers();
    const user = validateUserExist(id, users);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/cash/:amount", (req, res) => {
  try {
    const amount = parseFloat(req.params.amount);
    const users = filterByCash(amount);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/credit/:amount", (req, res) => {
  try {
    const amount = parseFloat(req.params.amount);
    const users = filterByCredit(amount);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = usersRoute;
