import { Request, Response } from 'express';
import invalidParameters from '../utils/invalidParams';
import { validate } from 'class-validator';
import { GoalQuery } from '../models/genricClass';
import {
  addGoalService,
  getGoalByIdService,
  listOfGoalService,
  removeGoalService,
  updateGoalService,
} from '../services/goalService';
import { GoalDto } from '../dto/goalDto';

const getAllGoals = async (req: Request, res) => {
  try {
    const expectedParams = [
      'page',
      'pageSize',
      'goalTitle',
      'goalDescription',
      'user',
      'categoryName',
      'status',
      'sortBy',
      'sortOrder',
    ];
    const invalidQuery = invalidParameters(req, expectedParams);
    if (!invalidQuery?.isValid) {
      return res.status(400).json({ error: 'Bad request' });
    }
    const goalQuery = new GoalQuery(req.query);
    const validationErrors = await validate(goalQuery, {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (validationErrors?.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation Error', details: validationErrors });
    }
    const { goals, goalCount } = await listOfGoalService(goalQuery);
    const goalDto = GoalDto.toDto(goals);
    const totalPages = Math.ceil(goalCount / goalQuery.pageSize);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: goalCount ? 'Goal list fetched successfully.' : 'No goal found',
      totalCount: goalCount,
      totalPages,
      currentPage: goalQuery.page,
      data: goalDto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addGoal = async (req: Request, res: Response) => {
  try {
    const addedGoal = await addGoalService(req.body);
    // const user = await addedGoal.user;
    // const category = await addedGoal.category;
    if (addedGoal) {
      return res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Goal added successfully.',
        data: addedGoal,
        data1: new GoalDto(addedGoal),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGoalById = async (req: Request, res: Response) => {
  try {
    const goalId = req.params.id;
    const existingGoal = await getGoalByIdService(goalId);

    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Goal found successfully.',
      data: new GoalDto(existingGoal),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGoal = async (req: Request, res: Response) => {
  try {
    const goalId = req.params.id;
    const existingGoal = await updateGoalService(goalId, req?.body);
    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Goal updated successfully.',
      data: new GoalDto(existingGoal),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteGoal = async (req: Request, res: Response) => {
  try {
    const GoalId = req.params.id;
    const goal = await removeGoalService(GoalId);
    if (goal.affected !== 0) {
      return res.json({
        statusCode: 200,
        status: 'success',
        message: 'Goal deleted successfully.',
      });
    } else {
      return res.status(404).json({ error: 'Failed to delete Goal' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addGoal, getAllGoals, getGoalById, updateGoal, deleteGoal };
