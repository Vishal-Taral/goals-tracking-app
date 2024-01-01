import loginService from '../services/loginService';

const loginController = async (req, res) => {
  try {
    const user = await loginService(req?.body);
    if (user?.user === null) {
      return res.status(402).json({
        success: false,
        message: 'User not Found.',
      });
    }

    if (user?.passwordCompare === false) {
      return res.status(403).json({
        success: false,
        message: 'Email or Password is incorrect.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'token generated successfully.',
      data: user?.authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default loginController;
