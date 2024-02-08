import { Goal } from '../entities/goal';
import { CategoryDto } from './categoryDto';
import { UserDetailsDto } from './userDto';

class GoalDto {
  goalId;
  name;
  description;
  status;
  startDate;
  endDate;
  user;
  category;
  constructor(goal) {
    (this.goalId = goal.goalId),
      (this.name = goal.name),
      (this.description = goal.description),
      (this.status = goal.status),
      (this.startDate = goal.startDate),
      (this.endDate = goal.endDate),
      (this.user = goal.__user__ ? new UserDetailsDto(goal.__user__) : {}),
      (this.category = goal.__category__
        ? new CategoryDto(goal.__category__)
        : {});
  }
  public static toDto(goals: Goal[]) {
    const listOfGoal = goals.map((goal) => {
      return new GoalDto(goal);
    });
    return listOfGoal;
  }
}

export { GoalDto };
