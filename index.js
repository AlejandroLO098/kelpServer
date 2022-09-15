const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const path = require("path");
var rp = require("request-promise");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

const PORT = process.env.PORT;
const INDEX_PATH = "./index.html";

app.use(cors());

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.path}`);
  next();
});

app.use(express.static(path.join(__dirname, "/../build/")));

app.get("/restro", (req, res) => {
  try {
    const req_url = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;
    const option = {
      uri: req_url,
      headers: {
        Authorization: `Bearer cb3Wp99ngACkQb8KWDjzR_9U22eIOI11XGNl3dHDq0Xa7aI5atfxIiqRnelb7xtIfrxVQBvCObD9ovcgE6NyMRxhIIn0xZqP9yGtHggFiZJthKdi_3Y7DEncKQEiY3Yx`,
      },
      method: "GET",
      json: true,
    };

    rp(req_url, option)
      .then((result) => {
        res.json(result);
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
});

app.get(["/"], (req, res) => {
  res.sendFile(path.join(__dirname, INDEX_PATH));
  // res.sendFile('viewer.html');
});

http.listen(PORT, () => {
  console.log(
    `listening on PORT ${PORT}, ${process.env.NODE_ENV} ENVIRONMENT.`
  );
});
