interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Debit' | 'Credit';
  amount: number;
}
