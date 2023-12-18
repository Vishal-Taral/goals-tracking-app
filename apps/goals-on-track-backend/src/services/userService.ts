import { User } from '../entities/user';

const removeUserService = async (userId: string) => {
  try {
    const deletedUser = await User.delete(userId);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};

const addUserService = async (body) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      mobile_number,
      email,
      password,
      role,
    } = body;

    const newUser = User.create({
      firstName,
      lastName,
      gender,
      mobile_number,
      email,
      password,
      role,
      createdAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      updatedAt: new Date(),
    });
    const addedUser = await User.save(newUser);
    return addedUser;
  } catch (error) {
    console.log(error);
  }
};

const getUserByIdService = async (userId: string) => {
  try {
    const existingUser = await User.findOne({ where: { userId } });
    return existingUser;
  } catch (error) {
    console.log(error);
  }
};

const listOfUserService = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const updateUserService = async (userId, body) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      mobile_number,
      email,
      password,
      role,
    } = body;
    const existingUser = await User.findOne({ where: { userId } });
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.gender = gender;
    existingUser.mobile_number = mobile_number;
    existingUser.email = email;
    existingUser.role = role;
    existingUser.password = password;
    existingUser.createdAt = new Date();
    existingUser.updatedAt = new Date();

    const updatedUser = await User.save(existingUser);
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

export {
  removeUserService,
  addUserService,
  getUserByIdService,
  listOfUserService,
  updateUserService,
};
