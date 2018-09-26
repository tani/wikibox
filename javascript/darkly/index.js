const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const { writeFileSync } = require("fs");
const tokenDB = {};

const userDB = {
  admin:
    "$2b$08$1H4jvU4VU/gYO/G3Q0z9n.inK7u6xupD.JmvgJx3hLIJeE4HTRSVe"
};

const app = express();

const sha256 = (data) => {
  const a = crypto.createHash("sha256");
  a.update(data);
  return a.digest("hex");
};

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/lib", express.static("lib"));

app.get("/index.html", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/data/:filename", (req, res) => {
  res.sendFile(`${__dirname}/data/${req.params.filename}`);
});

app.post("/data/:filename", (req, res) => {
  if (
    bcrypt.compareSync(req.body.token, tokenDB[sha256(req.ip)].token) &&
    Date.now() < tokenDB[sha256(req.ip)].time + 60 * 60 * 1000
  ) {
    writeFileSync(`${__dirname}/data/${req.params.filename}`, req.body.content);
    res.sendFile(`${__dirname}/data/${req.params.filename}`);
  } else {
    res.sendStatus(401);
  }
});

app.post("/token", (req, res) => {
  if (bcrypt.compareSync(req.body.password, userDB[req.body.username])) {
    const token = uuid();
    tokenDB[sha256(req.ip)] = {
      token: bcrypt.hashSync(token, 8),
      time: Date.now()
    };
    res.send(token);
  } else {
    res.sendStatus(401);
  }
});

app.post("/hash", (req, res) => {
  res.send(bcrypt.hashSync(req.body.data, 8));
});

app.listen(process.env.PORT || 8888);