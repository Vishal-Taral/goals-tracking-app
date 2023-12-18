import express from 'express';
import {
  addRole,
  deleteRole,
  getAllRoles,
  updateRole,
  getRoleById,
  // userLogin,
} from '../controllers/roleController';

const router = express.Router();

router.get('/roles', getAllRoles);

router.get('/role/:id', getRoleById);

// router.post('/login', userLogin);

router.post('/addRole', addRole);

router.put('/updateRole/:id', updateRole);

router.delete('/deleteRole/:id', deleteRole);

export { router as RoleRouter };
