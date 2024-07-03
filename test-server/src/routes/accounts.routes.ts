import { Router } from "express";
import { accounts } from "../data/accounts";

const accountsRouter = Router();
var accountsDb = accounts;

accountsRouter.get('', (req, res) => {
  res.status(200).json(accountsDb);
});

accountsRouter.post('', (req, res) => {
  const { name, typeAccount } = req.body;
  const id = 'husdhauh-w3ueiw-idush' + Math.random();

  accountsDb.push({
    id, name, typeAccount
  });
  res.status(201).send();
});

accountsRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  accountsDb = accounts.filter((account) => account.id !== id)

  res.status(204).send();
});

accountsRouter.put('', (req, res) => {
  const { id, name, typeAccount } = req.body;

  accountsDb.map((account) => {
    if (account.id === id) {
      account.name = name;
      account.typeAccount = typeAccount;
    }
    return account;
  });

  res.status(200).send();
});


export default accountsRouter;
