export interface AccountQuery {
  list(input: ListAccountInput): Promise<ListAccountOutput>;
}

export type ListAccountInput = {
  userId: string;
};

export type ListAccountOutput = {
  pages: number;
  data: { id: string; name: string; initialValue: string }[];
};
