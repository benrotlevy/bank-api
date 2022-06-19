const fs = require("fs");

const getUsers = () => {
  let users = fs.readFileSync("./bank-data/users.json").toString();
  return JSON.parse(users);
};

const saveUsers = (users) => {
  users = JSON.stringify(users);
  fs.writeFileSync("./bank-data/users.json", users);
  console.log(getUsers());
};

const findUser = (id, users) => {
  return users.find((user) => user.passportId === id);
};

const addNewUser = (name, passportId, cash, credit) => {
  validateUser(name, cash, credit, passportId);

  const users = getUsers();
  const duplicate = findUser(passportId, users);
  if (duplicate) {
    throw new Error("this user already have account");
  }

  const newUser = {
    name,
    cash,
    credit,
    passportId,
  };
  users.push(newUser);
  saveUsers(users);
};

const validateUser = (name, cash, credit, passportId) => {
  if (name.split(" ").length !== 2) {
    throw new Error("user must has first name and last name");
  }
  if (cash < 0) {
    throw new Error("cash cant be negative");
  }
  if (credit < 0) {
    throw new Error("credit cant be negative");
  }
  if (passportId.length !== 9) {
    throw new Error("Id must be a 9 digit string");
  }
};

const validateUserExist = (id, users) => {
  const user = findUser(id, users);
  if (!user) {
    throw new Error(`user ${id} does not exist`);
  }
  return user;
};

const updateCredit = (id, credit) => {
  const users = getUsers();
  const user = validateUserExist(id, users);
  if (credit < 0) {
    throw new Error("credit must be positive number or zero");
  }
  user.credit = credit;
  saveUsers(users);
};

const deposit = (passportId, amount) => {
  const users = getUsers();
  const user = validateUserExist(passportId, users);
  if (amount <= 0) {
    throw new Error("amount must be positive number");
  }
  user.cash += amount;
  saveUsers(users);
};

const withdraw = (passportId, amount) => {
  const users = getUsers();
  const user = validateUserExist(passportId, users);
  if (amount <= 0) {
    throw new Error("amount must be positive number");
  }
  if (user.cash + user.credit < amount) {
    throw new Error("user credit isnt enough for the withdraw");
  }
  user.cash -= amount;
  saveUsers(users);
};

const transfer = (fromId, toId, amount) => {
  const users = getUsers();
  if (fromId === toId) {
    throw new Error("you must insert diffrent acounts to be able to transfer");
  }
  const from = validateUserExist(fromId, users);
  const to = validateUserExist(toId, users);
  if (amount < 0) {
    throw new Error("amount must be positive number");
  }
  if (from.cash + from.credit < amount) {
    throw new Error(`user ${fromId} credit isnt enough for the withdraw`);
  }
  from.cash -= amount;
  to.cash += amount;
  saveUsers(users);
  return [from, to];
};

const filterByCash = (amount) => {
  if (isNaN(amount)) {
    throw new Error("amount must be a number");
  }
  const users = getUsers();
  return users.filter((user) => user.cash >= amount);
};

const filterByCredit = (amount) => {
  if (isNaN(amount)) {
    throw new Error("amount must be a number");
  }
  const users = getUsers();
  return users.filter((user) => user.credit >= amount);
};

// addNewUser("benjamin rotlevy", 300, 400, "208762195");
// addNewUser("yossi rotlevy", "208762196");
// deposit("208762195", 300);
// updateCredit("208762195", 200);
// withdraw("208762195", 700);
// transferring("208762195", "208762197", 100);

module.exports = {
  getUsers,
  validateUserExist,
  addNewUser,
  deposit,
  withdraw,
  updateCredit,
  transfer,
  filterByCash,
  filterByCredit,
};
