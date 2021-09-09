const userRoute = require("./user");
const postRouter = require("./post");

function run(app) {
  app.use("/api/auth", userRoute);
  app.use("/api/posts", postRouter);
  app.get("/", (req, res, next) => {
    res.send("WECOME TO API");
  });
}

module.exports = run;
