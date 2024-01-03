import jwt from 'jsonwebtoken';

const userAuthentication = (req, res, next) => {
  const token = req.header('AUTHORIZATION');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please Authenticate with Valid Token',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Token is Invalid or Expired ' });
    }
    const { userId } = payload;
    req.userId = userId;
    next();
  });
};

export { userAuthentication };
