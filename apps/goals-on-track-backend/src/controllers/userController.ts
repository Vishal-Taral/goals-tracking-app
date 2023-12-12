import { User } from '../entities/user';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'users fetched successfully.',
      data: users,
    });
  } catch (error) {
    throw new error();
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, gender, mobile_number, email, password } =
      req.body;
    const newUser = User.create({
      firstName,
      lastName,
      gender,
      mobile_number,
      email,
      password,
      createdAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      updatedAt: new Date(),
    });
    const addedUser = await User.save(newUser);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'user added successfully.',
      data: addedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, gender, mobile_number, email, password } =
      req.body;
    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.gender = gender;
    existingUser.mobile_number = mobile_number;
    existingUser.email = email;
    existingUser.password = password;
    existingUser.createdAt = new Date();
    existingUser.updatedAt = new Date();

    // Save the updated user
    const updatedUser = await User.save(existingUser);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'user updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const deleteUser = await User.delete(userId);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'user deleted successfully.',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllUsers, updateUser, addUser, deleteUser };
