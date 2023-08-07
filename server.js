const express = require("express");
const next = require("next");
const cors = require("cors");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
// const serviziRouter = require("./server/routes/servizi");
// const miscRouter = require("./server/routes/misc");
// const checkoutRouter = require("./server/routes/create-payment-intent");
// const postDb = require("./server/routes/post-db");
// const getDb = require("./server/routes/get-db");
// const contact = require("./server/routes/contact");
// const satispayRouter = require("./server/routes/satispay");

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  var corsOptions = {
    origin: false,
  };
  server.use(cors(corsOptions));

  // server.use("/api/database/post", postDb);
  // server.use("/api/checkout", checkoutRouter);
  // server.use("/api/servizi", serviziRouter);
  // server.use("/api/intermerda/get", getDb);
  // server.use("/api/satispay", satispayRouter);
  // server.use("/misc", miscRouter);
  // server.use("/mailer", contact);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use(bodyParser.urlencoded({ extended: true }));
  server.post("/api/auth/*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Ready on http://localhost:3000");
  });
});
