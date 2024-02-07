import { Category } from '../entities/category';
import { Goal } from '../entities/goal';
import { PageService, SearchGoal } from '../models/pageService';

const addGoalService = async (body) => {
  try {
    const { goalTitle, goalDescription, status, user, category } = body;
    var jan312009 = new Date();
    const newGoal = Goal.create({
      name: goalTitle,
      description: goalDescription,
      status: status,
      startDate: jan312009,
      endDate: jan312009,
      user,
      category,
      createdBy: 'admin',
      updatedBy: 'admin',
    });
    const addedRole = await Goal.save(newGoal);
    return addedRole;
  } catch (error) {
    console.log(error);
  }
};

const getGoalByIdService = async (goalId: string) => {
  try {
    const existingGoal = await Goal.findOne({ where: { goalId } });
    return existingGoal;
  } catch (error) {
    console.log(error);
  }
};

const removeGoalService = async (goalId: string) => {
  try {
    const deletedGoal = await Goal.delete(goalId);
    return deletedGoal;
  } catch (error) {
    console.log(error);
  }
};

const updateGoalService = async (goalId, body) => {
  try {
    const { goalTitle, goalDescription, status, startDate, endDate, category } =
      body;
    const existingGoal = await Goal.findOne({ where: { goalId } });
    existingGoal.name = goalTitle;
    existingGoal.description = goalDescription;
    existingGoal.status = status;
    existingGoal.startDate = startDate;
    existingGoal.endDate = endDate;
    existingGoal.category = category;
    const updatedGoal = await Goal.save(existingGoal);
    return updatedGoal;
  } catch (error) {
    console.log(error);
  }
};

const listOfGoalService = async (goalQuery) => {
  try {
    const { name, description, status, user, category } = goalQuery;
    const where: any = SearchGoal.createWhereQuery({
      name,
      description,
      status,
      user,
      category,
    });
    const relations = ['user', 'category'];
    const goals = await PageService.paginate(
      Goal.getRepository(),
      goalQuery,
      where,
      relations
    );
    return { goals: goals[0], goalCount: goals[1] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export {
  addGoalService,
  getGoalByIdService,
  removeGoalService,
  listOfGoalService,
  updateGoalService,
};
