import express from 'express';
import userAuthorization from '../controllers/userAuthorizationController';
import { userAuthentication } from '../middleware/userAuthentication';

const router = express.Router();

router.get('/getUserAuthorize', userAuthentication, userAuthorization);

export { router as AuthorizeRouter };
