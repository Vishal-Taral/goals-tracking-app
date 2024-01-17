import { validate } from 'class-validator';
import { UserDetailsDto } from '../dto/userDto';
import { GenericFilter } from '../models/genricClass';
import {
  addUserService,
  getUserByIdService,
  listOfUserService,
  removeUserService,
  updateUserService,
} from '../services/userService';

// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? +(page - 1) * limit : 0;

//   return { limit, offset };
// };

const getAllUsers = async (req, res) => {
  try {
    const { page, size, firstName, lastName, email, order, sortOrder } =
      req.query;
    const genericFilter = new GenericFilter();
    genericFilter.page = parseInt(page);
    genericFilter.pageSize = parseInt(size);
    genericFilter.orderBy = order;
    genericFilter.sortOrder = sortOrder;
    const validationErrors = await validate(genericFilter, {
      validationError: { target: false },
      whitelist:true,
      forbidNonWhitelisted: true
    });
    console.log("🚀 ~ getAllUsers ~ validationErrors:", validationErrors)
    
    
    if (validationErrors?.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation Error', details: validationErrors });
    }
    const { users, userCount } = await listOfUserService(
      genericFilter,
      firstName,
      lastName,
      email
    );
    const userDto = UserDetailsDto.toDto(users);
    const totalPages = Math.ceil(userCount / genericFilter.pageSize);
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

// const userLogin = async();

export { getAllUsers, updateUser, addUser, deleteUser, getUserById };
