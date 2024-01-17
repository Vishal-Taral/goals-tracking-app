import { User } from '../entities/user';
import { PageService, SearchUser } from '../models/pageService';
// const bcrypt = require('bcrypt');
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

// const listOfUserService = async (offset, limit, search) => {
//   try {
//     // const users = await User.find({
//     //   skip: 0,
//     //   take: 0,
//     //   order: { createdAt: 'desc' },
//     // });
//     const users = await User.find({
//       skip: offset,
//       take: limit,
//       order: { createdAt: 'ASC' },
//       // where: {
//       //   firstName: Like(`%${search}%`),
//       // },
//     });
//     const userCount = await User.count();
//     return { users, userCount };
//   } catch (error) {
//     console.log(error);
//   }
// };

const listOfUserService = async (filter, firstName, lastName, email) => {
  try {
    // Create an object representing the WHERE clause based on the search term
    // const where = search ? { firstName: ILike(`%${search}%`), } : {};
    const where: any = SearchUser.createWhereQuery({
      firstName,
      lastName,
      email,
    });

    // Use the paginate method from PageService to get paginated user data
    const users = await PageService.paginate(
      User.getRepository(),
      filter,
      where
    );
    return { users: users[0], userCount: users[1] };
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error to the caller
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
      role,
    } = body;
    const existingUser = await User.findOne({ where: { userId } });
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.gender = gender;
    existingUser.mobile_number = mobile_number;
    existingUser.email = email;
    existingUser.role = role;
    // existingUser.password = password;
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
