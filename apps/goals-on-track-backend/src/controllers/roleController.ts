import { RoleDto } from '../dto/roleDto';
import {
  addRoleService,
  getRoleByIdService,
  listOfRoleService,
  removeRoleService,
  updateRoleService,
} from '../services/rollService';

const getAllRoles = async (req, res) => {
  try {
    const roles = await listOfRoleService();
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'roles fetched successfully.',
      data: RoleDto.toDto(roles),
    });
  } catch (error) {
    throw new error();
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const existingRole = await getRoleByIdService(roleId);
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role found successfully.',
      data: new RoleDto(existingRole),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRole = async (req, res) => {
  try {
    const addedRole = await addRoleService(req.body);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role added successfully.',
      data: new RoleDto(addedRole),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const existingRole = await updateRoleService(roleId, req.body);
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Save the updated user
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role updated successfully.',
      data: new RoleDto(existingRole),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await removeRoleService(roleId);
    if (role.affected !== 0) {
      return res.json({
        statusCode: 200,
        status: 'success',
        message: 'Role deleted successfully.',
      });
    } else {
      return res.status(404).json({ error: 'Failed to delete role' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllRoles, updateRole, addRole, deleteRole, getRoleById };
