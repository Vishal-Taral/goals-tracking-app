import { UserDetailsDto } from '../dto/userDto';
import {
  addUserService,
  getUserByIdService,
  listOfUserService,
  removeUserService,
  updateUserService,
} from '../services/userService';

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? +(page - 1) * limit : 0;

  return { limit, offset };
};

const getAllUsers = async (req, res) => {
  try {
    const { page, size, search } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { users, userCount } = await listOfUserService(offset, limit, search);
    const userDto = UserDetailsDto.toDto(users);
    const totalPages = Math.ceil(userCount / limit);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'users fetched successfully.',
      totalCount: userCount,
      totalPages,
      currentPage: parseInt(page),
      data: userDto,
    });
  } catch (error) {
    throw new error();
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

// const userLogin = async();

export { getAllUsers, updateUser, addUser, deleteUser, getUserById };
