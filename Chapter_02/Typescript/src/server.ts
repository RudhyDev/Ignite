import express from 'express';
import { CreateCourse } from './routes';

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.get("/", CreateCourse);
