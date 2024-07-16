import { Router } from "express";
import { categories } from "../data/categories";


const categoriesRouter = Router();
const categoriesDb = categories;

categoriesRouter.get('', (req, res) => {
  res.status(200).json(categoriesDb);
});

export default categoriesRouter;
