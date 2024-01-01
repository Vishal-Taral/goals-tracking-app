import { UserDetailsDto } from '../dto/userDto';
import authorizationService from '../services/authorizationService';

const userAuthorization = async (req, res) => {
  try {
    const user = await authorizationService(req.userId);
    return res.status(200).json({
      success: true,
      response: new UserDetailsDto(user),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default userAuthorization;
