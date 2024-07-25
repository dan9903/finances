import { Router } from "express";
import { ITransaction, transactions } from "../data/transactions";
import { categories } from "../data/categories";

const transactionsRouter = Router();
var transactionsDb = transactions;
var categoryDb = categories;

transactionsRouter.get('', (req, res) => {
  res.status(200).json(transactionsDb);
});

transactionsRouter.post('', (req, res) => {
  const { date, account, category, payee, amount, nature, notes } = req.body;

  const id = 'husdhauh-w3ueiw-idush' + Math.random();

  transactionsDb.push({ id, date, account, category, payee, amount, nature, notes });

  res.status(201).send();
});

transactionsRouter.get('/dashboard', (req, res) => {
  const { accountId, startDate, endDate } = req.query;
  console.log(accountId, startDate, endDate);

  const transInc: { date: Date, amount: number }[] = [];
  transactionsDb.forEach((value: ITransaction) => {
    if (value.nature === 'I') {
      transInc.push({
        date: value.date,
        amount: value.amount,
      });
    }
  });

  const transOut: { date: Date, amount: number }[] = [];
  transactionsDb.filter((value) => {
    if (value.nature === 'O') {
      transOut.push({
        date: value.date,
        amount: value.amount
      });
    }
  });

  let cats = transactionsDb.reduce((acc, current) => {
    const existingAccountId = acc.get(current.category);
    if (existingAccountId) {
      acc.set(current.category, existingAccountId + current.amount);
    } else {
      acc.set(current.category, current.amount);
    }
    return acc;
  }, new Map<string, number>());

  const catResp: { name: string, amount: number }[] = [];
  cats.forEach((value, key) => {
    const ca = categoryDb.find(i => i.id === key)
    catResp.push({
      name: ca?.name ? ca?.name : '',
      amount: value
    });
  });

  var totalIncome = 0;
  var totalOutcome = 0;

  transInc.forEach((current) => {
    if (current?.amount)
      totalIncome = totalIncome + current.amount;
  });

  transOut.forEach((current) => {
    if (current?.amount)
      totalOutcome = totalOutcome + current.amount;
  });

  res.status(200).json({
    totalIncome: totalIncome,
    totalOutcome: totalOutcome,
    diffIncome: 12,
    diffOutcome: -15,
    categories: catResp,
    transactions: {
      income: transInc,
      outcome: transOut
    }
  });
});

transactionsRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  transactionsDb = transactionsDb.filter((transaction) => transaction.id !== id)

  res.status(204).send();
});

transactionsRouter.put('', (req, res) => {
  const { id, date, account, category, payee, amount, nature, notes } = req.body;

  transactionsDb.map((transaction) => {
    if (transaction.id === id) {
      transaction.date = date;
      transaction.account = account;
      transaction.category = category;
      transaction.payee = payee ? payee : null;
      transaction.amount = amount;
      transaction.nature = nature;
      transaction.notes = notes ? notes : null;
    }
    return transaction;
  });

  res.status(200).send();
});


export default transactionsRouter;
