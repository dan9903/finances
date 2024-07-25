
export interface ITransactionsDashboardRequest {
  accountId: string;
  startDate: Date,
  endDate: Date
}

export interface ITransactionsDashboardResponse {
  totalIncome: number;
  totalOutcome: number;
  diffIncome: number;
  diffOutcome: number;
  categories: ICategoryDash[],
  transactions: ITransactionDash;
}

export interface ICategoryDash {
  name: string;
  amount: number;
}

export interface ITransactionDash {
  income: ITransaction[];
  outcome: ITransaction[];
}
export interface ITransaction {
  date: Date,
  amount: number;
}


export function getITransactionsDashboardResponseEmpty() {
  const categories: ICategoryDash[] = [];
  const emptyTrans: ITransaction[] = [];
  const transactions: ITransactionDash = {
    income: emptyTrans,
    outcome: emptyTrans
  } as ITransactionDash;
  return {
    totalIncome: 0,
    totalOutcome: 0,
    diffIncome: 0,
    diffOutcome: 0,
    categories: categories,
    transactions: transactions
  } as ITransactionsDashboardResponse;
}
