const express = require("express");
const { port } = require("./config/constants");
const db = require("./config");
const { credentials, corsOptions } = require("./config/cred");
const app = express();
const cors = require("cors");
const { ok, err } = require("./helper/utils");
// const User = require("./models/userModel");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`welcome to mkhotami app`);
});

// app.use("/api/user", require("./routes/userRoute"));
app.use("/api/user", async (req, res) => {
  res.json({ name: "ahmad" });
  // try {
  //   const data = await User.find({});
  //   ok(res, 200, `getUsers`, data);
  // } catch (error) {
  //   err(res, 400, error);
  // }
});

db.then(() => {
  app.listen(port, () => console.log(`connect to mongodb and listening on port ${port}`));
}).catch((err) => {
  console.error(err.message);
});
