import { Role } from '../entities/role';

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'roles fetched successfully.',
      data: roles,
    });
  } catch (error) {
    throw new error();
  }
};

const addRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    const newRole = Role.create({
      name: roleName,
      description: roleDescription,
      createdAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      updatedAt: new Date(),
    });
    const addedRole = await Role.save(newRole);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role added successfully.',
      data: addedRole,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { roleName, roleDescription } = req.body;
    const existingRole = await Role.findOne({ where: { roleId } });
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    existingRole.name = roleName;
    existingRole.description = roleDescription;
    existingRole.createdAt = new Date();
    existingRole.updatedAt = new Date();

    // Save the updated user
    const updatedRole = await Role.save(existingRole);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role updated successfully.',
      data: updatedRole,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findOne({ where: { roleId } });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    const deleteRole = await Role.delete(roleId);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Role deleted successfully.',
      data: role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllRoles, updateRole, addRole, deleteRole };
