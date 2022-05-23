import { CategoriesRepository } from "./../repositories/CategoriesRepository";
import { Router } from "express";

export const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});
