const jwt = require('jsonwebtoken');

const config = require('../config/config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.get('/secret'), (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          data: '',
          message: 'Invalid token!.',
          code: 403
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      data: '',
      message: 'Token has expired.',
      code: 401
    });
  }
};

module.exports = {
  authenticateJWT
};
