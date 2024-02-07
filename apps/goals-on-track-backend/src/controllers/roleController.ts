import { validate } from 'class-validator';
import { RoleDto } from '../dto/roleDto';
import { RoleQuery } from '../models/genricClass';
import {
  addRoleService,
  getRoleByIdService,
  listOfRoleService,
  removeRoleService,
  updateRoleService,
} from '../services/rollService';
import invalidParameters from '../utils/invalidParams';
import { Request, Response } from 'express';

const getAllRoles = async (req: Request, res: Response) => {
  try {
    const expectedParams = [
      'page',
      'pageSize',
      'roleDescription',
      'roleName',
      'sortBy',
      'sortOrder',
    ];
    const invalidQuery = invalidParameters(req, expectedParams);
    if (!invalidQuery?.isValid) {
      return res.status(400).json({ error: 'Bad request' });
    }
    const roleQuery = new RoleQuery(req.query);
    const validationErrors = await validate(roleQuery, {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (validationErrors?.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation Error', details: validationErrors });
    }
    const { roles, roleCount } = await listOfRoleService(roleQuery);
    const totalPages = Math.ceil(roleCount / roleQuery.pageSize);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: roleCount
        ? 'role list fetched successfully.'
        : 'no role is found',
      totalCount: roleCount,
      totalPages,
      currentPage: roleQuery.page,
      data: RoleDto.toDto(roles),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRoleById = async (req: Request, res: Response) => {
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

const addRole = async (req: Request, res: Response) => {
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

const updateRole = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.id;
    const existingRole = await updateRoleService(roleId, req.body);
    if (!existingRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

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

const deleteRole = async (req: Request, res: Response) => {
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
