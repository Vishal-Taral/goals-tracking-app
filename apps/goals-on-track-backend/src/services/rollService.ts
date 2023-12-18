import { Role } from '../entities/role';

const removeRoleService = async (roleId: string) => {
  try {
    const deleteRole = await Role.delete(roleId);
    return deleteRole;
  } catch (error) {
    console.log(error);
  }
};

const addRoleService = async (body) => {
  try {
    const { roleName, roleDescription } = body;
    const newRole = Role.create({
      name: roleName,
      description: roleDescription,
      createdAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      updatedAt: new Date(),
    });
    const addedRole = await Role.save(newRole);
    return addedRole;
  } catch (error) {
    console.log(error);
  }
};

const getRoleByIdService = async (roleId: string) => {
  try {
    const existingRole = await Role.findOne({ where: { roleId } });
    return existingRole;
  } catch (error) {
    console.log(error);
  }
};

const listOfRoleService = async () => {
  try {
    const roles = await Role.find();
    return roles;
  } catch (error) {
    console.log(error);
  }
};

const updateRoleService = async (roleId, body) => {
  try {
    const { roleName, roleDescription } = body;
    const existingRole = await Role.findOne({ where: { roleId } });
    existingRole.name = roleName;
    existingRole.description = roleDescription;
    existingRole.createdAt = new Date();
    existingRole.updatedAt = new Date();

    const updatedRole = await Role.save(existingRole);

    return updatedRole;
  } catch (error) {
    console.log(error);
  }
};

export {
  removeRoleService,
  addRoleService,
  getRoleByIdService,
  listOfRoleService,
  updateRoleService,
};
