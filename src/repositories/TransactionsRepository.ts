import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acum, cur) => {
      return acum + (cur.type === 'income' ? 1 : 0) * cur.value;
    }, 0);

    const outcome = this.transactions.reduce((acum, cur) => {
      return acum + (cur.type === 'outcome' ? 1 : 0) * cur.value;
    }, 0);

    const total = income - outcome;

    const balance: Balance = new Balance({ income, outcome, total });

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
