const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET_KEY, (err, userInfo) => {
      if (err) {
        return res.sendStatus(403); // 유효하지 않은 토큰
      }

      req.user = userInfo;
      next();
    });
  } else {
    res.sendStatus(401); // 토큰 없음
  }
};

module.exports = authenticateJWT;
