import { Router } from "express";
import { accounts } from "../data/accounts";

const accountsRouter = Router();
var accountsDb = accounts;

accountsRouter.get('', (req, res) => {
  res.status(200).json(accountsDb);
});

accountsRouter.post('', (req, res) => {
  const { name, nature } = req.body;
  const id = 'husdhauh-w3ueiw-idush' + Math.random();

  accountsDb.push({
    id, name, nature
  });
  res.status(201).send();
});

accountsRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  accountsDb = accountsDb.filter((account) => account.id !== id)

  res.status(204).send();
});

accountsRouter.put('', (req, res) => {
  const { id, name, nature } = req.body;

  accountsDb.map((account) => {
    if (account.id === id) {
      account.name = name;
      account.nature = nature;
    }
    return account;
  });

  res.status(200).send();
});


export default accountsRouter;
