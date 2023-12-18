import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

const jsonWebToken = jwt();
const jwt_key = 'sdfghjkla@$%&';

const userAuthentication = (req, res, next) => {
  const token = req.header('AUTHORIZATION');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'please Authenticate with Valid Token',
    });
  }
  jsonWebToken.verify(token, jwt_key, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'u must logged in' });
    }
    const { userId } = payload;
    const existingUser = User.findOne({ where: { userId } });
    if (existingUser) {
      req.user = existingUser;
      next();
    }
  });
};

export { userAuthentication };
