import loginController from '../controllers/loginController';
import express from 'express';

const router = express.Router();

router.post('/Login', loginController);

export { router as LoginRouter };
