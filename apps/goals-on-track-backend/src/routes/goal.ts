import express from 'express';
import {
  addGoal,
  deleteGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
} from '../controllers/goalController';
import { userAuthentication } from '../middleware/userAuthentication';

const router = express.Router();

router.get('/goals', userAuthentication, getAllGoals);

router.get('/goal/:id', userAuthentication, getGoalById);

router.post('/addGoal', userAuthentication, addGoal);

router.put('/updateGoal/:id', userAuthentication, updateGoal);

router.delete('/deleteGoal/:id', userAuthentication, deleteGoal);

export { router as GoalRouter };
