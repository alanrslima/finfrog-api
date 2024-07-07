export interface CategoryQuery {
  list(input: ListCategoryInput): Promise<ListCategoryOutput>;
}

export type ListCategoryInput = {
  userId: string;
};

export type ListCategoryOutput = {
  id: string;
  name: string;
}[];
