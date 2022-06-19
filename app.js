const express = require("express");
const usersRoute = require("./routes/users-routes.js");
const manage = require("./routes/manage.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/users", usersRoute);
app.use("/manage", manage);

app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});
