import express, { Application, Request, Response } from "express";
import { json } from "stream/consumers";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app: Application = express();
const port: number = 8000;

app.use(express.json());

const todos: Todo[] = [];

// Create Todo
app.post("/todo", (req: Request, res: Response) => {
  const { title } = req.body;

  const todo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
