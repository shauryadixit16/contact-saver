const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(400).json({ msg: 'No token' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: 'token is invalid' });
  }
};
