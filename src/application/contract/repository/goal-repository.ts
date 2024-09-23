import { Goal } from "../../../domain/entity/goal";

export interface GoalRepository {
  create(goal: Goal): Promise<void>;
  getById(id: string): Promise<Goal>;
}
