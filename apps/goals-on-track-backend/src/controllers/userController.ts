import { UserDetailsDto } from '../dto/userDto';
import { UserQuery } from '../models/genricClass';
import {
  addUserService,
  getUserByIdService,
  listOfUserService,
  removeUserService,
  updateUserService,
} from '../services/userService';
import invalidParameters from '../utils/invalidParams';

const getAllUsers = async (req, res) => {
  try {
    const expectedParams = [
      'page',
      'pageSize',
      'firstName',
      'lastName',
      'email',
      'order',
      'sortOrder',
    ];
    const invalidQuery = invalidParameters(req.query, expectedParams);
    if (!invalidQuery?.isValid) {
      return res.status(400).json({ error: 'Bad request' });
    }
    const userQuery = new UserQuery(req.query);
    const { users, userCount } = await listOfUserService(userQuery);
    const userDto = UserDetailsDto.toDto(users);
    const totalPages = Math.ceil(userCount / userQuery.pageSize);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: userCount ? 'User list fetched successfully.' : 'no user found',
      totalCount: userCount,
      totalPages,
      currentPage: userQuery.page,
      data: userDto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addUser = async (req, res) => {
  try {
    const addedUser = await addUserService(req.body);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'user added successfully.',
      data: new UserDetailsDto(addedUser),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await getUserByIdService(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'User found successfully.',
      data: new UserDetailsDto(existingUser),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await updateUserService(userId, req?.body);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save the updated user
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'user updated successfully.',
      data: new UserDetailsDto(existingUser),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await removeUserService(userId);
    if (user.affected !== 0) {
      return res.json({
        statusCode: 200,
        status: 'success',
        message: 'user deleted successfully.',
      });
    } else {
      return res.status(404).json({ error: 'Failed to delete user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllUsers, updateUser, addUser, deleteUser, getUserById };
