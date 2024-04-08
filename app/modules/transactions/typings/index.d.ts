/**
 *  Specifies what properties a Transaction object must have,
 *  as well as the types of those properties.
 */
interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Debit' | 'Credit';
  amount: number;
}
