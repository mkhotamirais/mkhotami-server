const express = require("express");
const { port } = require("./config/constants");
const db = require("./config");
const { credentials, corsOptions } = require("./config/cred");
const app = express();
const cors = require("cors");

app.use(credentials);
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`welcome to mkhotami app`);
});

// app.use("/api/user", require("./routes/userRoute"));

db.then(() => {
  app.listen(port, () => console.log(`connect to mongodb and listening on port ${port}`));
}).catch((err) => {
  console.error(err.message);
});
