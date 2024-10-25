const jwt = require("jsonwebtoken");

class Verify {
  static verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return req.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Anda harus login" });
      req.username = decoded;
      next();
    });
  };
}

module.exports = Verify;
