const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  try {
    const { session } = await req.cookies;
    // console.log('session', session);
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    // console.log('payload', payload);
    req.user = payload;
    // console.log('req.user', req.user);
    next();
  } catch (error) {
    error.message = 'You must be signed in to continue';
    error.status = 401;
    next(error);
  }
};
