export interface TransactionQuery {
  list(input: ListTransactionInput): Promise<ListTransactionOutput>;
}

export type ListTransactionInput = {
  page?: number;
  userId: string;
};

export type ListTransactionOutput = {
  pages: number;
  data: {
    id: string;
    name: string;
    value: number;
    date: string;
    account: {
      id: string;
      name: string;
    };
    category?: {
      id: string;
      name: string;
    };
    createdAt: string;
  }[];
};
