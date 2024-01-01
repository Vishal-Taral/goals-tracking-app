import { User } from '../entities/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
const loginService = async (body) => {
  const { email, password } = body;
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    return {
      user: null,
      passwordCompare: false,
      authToken: null,
    };
  }
  const passwordCompare = await bcrypt.compare(
    password,
    existingUser?.password
  );

  if (!passwordCompare) {
    return {
      user: existingUser,
      passwordCompare: false,
      authToken: null,
    };
  }
  const payload = {
    userId: existingUser?.userId,
  };
  const authToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return {
    user: existingUser,
    passwordCompare: true,
    authToken: authToken,
  };
};

export default loginService;
