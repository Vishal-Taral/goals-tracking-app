import express from 'express';
import {
  addRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from '../controllers/roleController';

const router = express.Router();

router.get('/roles', getAllRoles);

router.post('/addRole', addRole);

router.put('/updateRole/:id', updateRole);

router.delete('/deleteRole/:id', deleteRole);

export { router as RoleRouter };
