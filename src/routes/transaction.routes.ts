import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository
);

interface TransactionsObject {
  transactions: Transaction[];
  balance: Balance;
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsObject = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance()
    };

    return response.json(transactionsObject);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    if (type !== 'income' && type !== 'outcome')
      throw Error('The transaction type is not correct');

    const transaction = createTransactionService.execute({
      title,
      value,
      type
    });

    console.log(transaction);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
