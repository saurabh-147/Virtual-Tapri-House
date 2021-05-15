const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: false, error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "This is secret that is revealed to all", (err, payload) => {
    if (err) {
      return res.status(401).json({ success: false, error: "You must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      console.log(userData._id);
      next();
    });
  });
};
