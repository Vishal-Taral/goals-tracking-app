import express from 'express';
import {
  addRole,
  deleteRole,
  getAllRoles,
  updateRole,
  getRoleById,
  // userLogin,
} from '../controllers/roleController';
import { userAuthentication } from '../middleware/userAuthentication';

const router = express.Router();

router.get('/roles',userAuthentication, getAllRoles);

router.get('/role/:id',userAuthentication, getRoleById);

// router.post('/login', userLogin);

router.post('/addRole',userAuthentication, addRole);

router.put('/updateRole/:id',userAuthentication, updateRole);

router.delete('/deleteRole/:id',userAuthentication, deleteRole);

export { router as RoleRouter };
