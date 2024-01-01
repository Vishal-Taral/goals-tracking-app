import { User } from '../entities/user';

const authorizationService = async (userId) => {
  try {
    const user = await User.findOne({ where: { userId } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default authorizationService;
