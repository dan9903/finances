export interface ITransaction {
  id: string;
  date: Date;
  account: string;
  category: string;
  payee?: string;
  amount: number;
  nature: 'I' | 'O' | 'B';
  notes?: string;
}

export interface ITransactionRequest {
  id?: string;
  date?: Date;
  account?: string;
  category?: string;
  payee?: string;
  amount?: number;
  nature?: 'I' | 'O' | 'B';
  notes?: string;
}

export interface ITransactionTable extends ITransaction {
  accountName: string;
  categoryName: string;
}

