import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    // TODO
    if (!['income', 'outcome'].includes(transaction.type)) {
      throw Error('Transaction type is invalid.');
    }

    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error(
        'Should not be able to create outcome transaction without a valid balance.',
      );
    }
    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
