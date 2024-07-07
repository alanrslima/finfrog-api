import { Category } from "../../../../domain/entity/category";
import { ForbiddenError } from "../../../../error/forbidden-error";
import { ResourceNotFoundError } from "../../../../error/resource-not-found-error";
import { CategoryMemoryRepository } from "../../../../infra/repository/memory/category-memory-repository";
import { UpdateCategoryUseCase } from "../update-category-use-case";

it("should not update a category if does not exists", () => {
  const category = Category.create({ name: "Mercado", userId: "123" });
  const categoryMemoryRepository = new CategoryMemoryRepository([category]);
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryMemoryRepository
  );
  const execute = async () =>
    await updateCategoryUseCase.execute({
      id: "123",
      name: "Test",
      user: { id: "1234", permissions: [], role: "role" },
    });
  expect(execute).rejects.toThrow(ResourceNotFoundError);
});

it("should not update a category if not the owner", () => {
  const category = Category.create({ name: "Mercado", userId: "123" });
  const categoryMemoryRepository = new CategoryMemoryRepository([category]);
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryMemoryRepository
  );
  const execute = async () =>
    await updateCategoryUseCase.execute({
      id: category.getId(),
      name: "Test",
      user: { id: "1234", permissions: [], role: "role" },
    });
  expect(execute).rejects.toThrow(ForbiddenError);
});

it("should update a category", async () => {
  const category = Category.create({ name: "Mercado", userId: "123" });
  const categoryMemoryRepository = new CategoryMemoryRepository([category]);
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryMemoryRepository
  );
  await updateCategoryUseCase.execute({
    id: category.getId(),
    name: "Test",
    user: { id: "123", permissions: [], role: "role" },
  });
  expect(categoryMemoryRepository.getData()[0].getName()).toEqual("Test");
  expect(categoryMemoryRepository.getData()[0].getId()).toEqual(
    category.getId()
  );
  expect(categoryMemoryRepository.getData()[0].getUserId()).toEqual("123");
});
