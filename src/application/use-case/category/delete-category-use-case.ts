import { ForbiddenError } from "../../../error/forbidden-error";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { CategoryRepository } from "../../contract/repository/category-repository";
import { UseCase } from "../../contract/use-case";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.getById(input.id);
    if (category.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissões para atualizar esta categoria"
      );
    }
    await this.categoryRepository.delete(category);
  }
}

type Input = {
  id: string;
  user: LoggedUserDTO;
};

type Output = void;
