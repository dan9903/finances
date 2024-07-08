import { Router } from "express";
import { transactions } from "../data/transactions";

const transactionsRouter = Router();
var transactionsDb = transactions;

transactionsRouter.get('', (req, res) => {
  res.status(200).json(transactionsDb);
});

transactionsRouter.post('', (req, res) => {
  const { date, account, category, payee, amount, nature, notes } = req.body;

  const id = 'husdhauh-w3ueiw-idush' + Math.random();

  transactionsDb.push({ id, date, account, category, payee, amount, nature, notes });

  res.status(201).send();
});

transactionsRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  transactionsDb = transactions.filter((transaction) => transaction.id !== id)

  res.status(204).send();
});

transactionsRouter.put('', (req, res) => {
  const { id, date, account, category, payee, amount, nature, notes } = req.body;

  transactionsDb.map((transaction) => {
    if (transaction.id === id) {
      transaction.date = date;
      transaction.account = account;
      transaction.category = category;
      transaction.payee = payee ? notes : null;
      transaction.amount = amount;
      transaction.nature = nature;
      transaction.notes = notes ? notes : null;
    }
    return transaction;
  });

  res.status(200).send();
});


export default transactionsRouter;
