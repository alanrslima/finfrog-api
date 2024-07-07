import { CategoryMemoryRepository } from "../../../../infra/repository/memory/category-memory-repository";
import { CreateCategoryUseCase } from "../create-category-use-case";

it("should create a category", async () => {
  const categoryMemoryRepository = new CategoryMemoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryMemoryRepository
  );
  await createCategoryUseCase.execute({
    name: "Test",
    user: { id: "123", permissions: [], role: "role" },
  });
  expect(categoryMemoryRepository.getData()).toHaveLength(1);
  const createdTrensaction = categoryMemoryRepository.getData()[0];
  expect(createdTrensaction.getName()).toEqual("Test");
  expect(createdTrensaction.getId()).toBeDefined();
  expect(createdTrensaction.getUserId()).toEqual("123");
});
