const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authtoken = req.headers.token;
  if (!authtoken) return res.status(401).send("Missing token");

  try {
    const verified = jwt.verify(authtoken, process.env.JWT_KEY);
    next();
  } catch (err) {
    res.status(402).send("Wrong Token");
  }
};
