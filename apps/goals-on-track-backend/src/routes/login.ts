import {
  loginController,
  logOutController,
} from '../controllers/loginController';
import express from 'express';

const router = express.Router();

router.post('/Login', loginController);
router.post('/Logout', logOutController);

export { router as LoginRouter };
