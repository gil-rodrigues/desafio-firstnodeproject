import { uuid } from 'uuidv4';

class Transaction {
  income: number;

  outcome: number;

  total: number;

  constructor({ income, outcome, total }: Transaction) {
    this.income = income;
    this.outcome = outcome;
    this.total = total;
  }
}

export default Transaction;
