import { Role } from '../entities/role';
import { PageService, SearchRole } from '../models/pageService';

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
      createdBy: 'admin',
      updatedBy: 'admin',
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

const listOfRoleService = async (roleQuery) => {
  try {
    const { name, description } = roleQuery;
    const where: any = SearchRole.createWhereQuery({
      name,
      description,
    });

    const roles = await PageService.paginate(
      Role.getRepository(),
      roleQuery,
      where
    );
    return { roles: roles[0], roleCount: roles[1] };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateRoleService = async (roleId, body) => {
  try {
    const { roleName, roleDescription } = body;
    const existingRole = await Role.findOne({ where: { roleId } });
    existingRole.name = roleName;
    existingRole.description = roleDescription;

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
