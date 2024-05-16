const express = require("express");
const { port, root } = require("./config/constants");
const db = require("./config");
const { corsOptions, credentials } = require("./config/cred");
const app = express();
const cors = require("cors");
const { join } = require("path");
const cookieParser = require("cookie-parser");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(root, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`welcome to mkhotami app`);
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/tag", require("./routes/tagRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/product", require("./routes/productRoute"));

db.then(() => {
  app.listen(port, () => console.log(`connect to mongodb and listening on port ${port}`));
}).catch((err) => {
  console.error(err.message);
});
