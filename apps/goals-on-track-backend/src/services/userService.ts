import { User } from '../entities/user';
import { PageService, SearchUser } from '../models/pageService';
import bcrypt from 'bcrypt';
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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { isUserExist: true, addedUser: {} };
    } else {
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = User.create({
      firstName,
      lastName,
      gender,
      mobile_number,
      email,
      password: hash,
      role,
      createdBy: 'admin',
      updatedBy: 'admin',
    });
    const addedUser = await User.save(newUser);
    return { isUserExist: false, addedUser };
  } catch (error) {
    console.log(error);
    throw error;
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

const listOfUserService = async (userQuery) => {
  try {
    const { firstName, lastName, email } = userQuery;
    const where: any = SearchUser.createWhereQuery({
      firstName,
      lastName,
      email,
    });
    const relations = ['role'];
    const users = await PageService.paginate(
      User.getRepository(),
      userQuery,
      where,
      relations
    );
    return { users: users[0], userCount: users[1] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserService = async (userId, body) => {
  try {
    const { firstName, lastName, gender, mobile_number, email, role } = body;
    const existingUser = await User.findOne({ where: { userId } });
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.gender = gender;
    existingUser.mobile_number = mobile_number;
    existingUser.email = email;
    existingUser.role = role;
    // existingUser.password = password;

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
