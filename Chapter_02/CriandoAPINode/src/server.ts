import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();
app.use(express.json());

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

app.use("/categories", categoriesRoutes);