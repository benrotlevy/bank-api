const express = require("express");
const {
  deposit,
  getUsers,
  validateUserExist,
  withdraw,
  updateCredit,
  transfer,
} = require("../data-massege/app.js");

const manage = express.Router();

manage.patch("/deposit/:id", (req, res) => {
  try {
    const amount = parseFloat(req.body.amount) || 0;
    deposit(req.params.id, amount);
    const users = getUsers();
    const user = validateUserExist(req.params.id, users);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/withdraw/:id", (req, res) => {
  try {
    const amount = parseFloat(req.body.amount) || 0;
    withdraw(req.params.id, amount);
    const users = getUsers();
    const user = validateUserExist(req.params.id, users);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/credit/:id", (req, res) => {
  try {
    const amount = parseFloat(req.body.amount) || -1;
    updateCredit(req.params.id, amount);
    const users = getUsers();
    const user = validateUserExist(req.params.id, users);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/transfer", (req, res) => {
  try {
    const amount = parseFloat(req.body.amount) || -1;
    const participating = transfer(req.body.from, req.body.to, amount);
    res.status(200).send(participating);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = manage;
