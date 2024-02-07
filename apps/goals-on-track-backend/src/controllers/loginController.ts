import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = async (req: Request, res: Response) => {
  try {
    const user = await loginService(req?.body);
    if (user?.user === null) {
      return res.status(404).json({
        success: false,
        message: 'User not Found.',
      });
    }

    if (user?.passwordCompare === false) {
      return res.status(401).json({
        success: false,
        message: 'Email or Password is incorrect.',
      });
    }

    return res
      .status(200)
      .cookie('user', user?.authToken, {
        maxAge: 9000000,
        httpOnly: true,
        path: '/',
      })
      .json({
        success: true,
        message: 'token generated successfully.',
        data: user?.authToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logOutController = async (req: Request, res: Response) => {
  try {
    const { authorization, cookie } = req.headers;
    const userCookie = cookie;
    console.log(userCookie);
    if (!authorization || userCookie === undefined) {
      return res.status(401).json({
        success: false,
        status: 'error',
        error: 'Please Login first',
      });
    } else {
      return res.status(200).clearCookie(cookie).json({
        success: true,
        status: 'success',
        message: 'Logged out Successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { loginController, logOutController };
