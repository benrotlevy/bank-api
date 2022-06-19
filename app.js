const express = require("express");
const path = require("path");
const usersRoute = require("./routes/users-routes.js");
const manage = require("./routes/manage.js");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.use(cors());
app.use(express.json());
app.use("/users", usersRoute);
app.use("/manage", manage);

app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});
