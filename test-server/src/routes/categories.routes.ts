import { Router } from "express";
import { categories } from "../data/categories";


const categoriesRouter = Router();
var categoriesDb = categories;

categoriesRouter.get('', (req, res) => {
  res.status(200).json(categoriesDb);
});

categoriesRouter.post('', (req, res) => {
  const { name, description } = req.body;
  const id = 'husdhauh-w3ueiw-idush' + Math.random();

  categoriesDb.push({
    id, name, description
  });

  res.status(201).send();
});

categoriesRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  categoriesDb = categoriesDb.filter((category) => category.id !== id)

  res.status(204).send();
});

categoriesRouter.put('', (req, res) => {
  const { id, name, description } = req.body;

  categoriesDb.map((category) => {
    if (category.id === id) {
      category.name = name;
      category.description = description;
    }
    return category;
  });

  res.status(200).send();
});


export default categoriesRouter;
