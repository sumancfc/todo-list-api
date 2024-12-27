import express, { Application, Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app: Application = express();
const port: number = 8000;

app.use(express.json());

const DATA_FILE = path.join(__dirname, "todos.json");

// Ensure the data file exists
const initializeDataFile = async () => {
  try {
    if (!(await fs.pathExists(DATA_FILE))) {
      await fs.writeJSON(DATA_FILE, []); // Create file with an empty array
    }
  } catch (error) {
    console.error("Failed to initialize data file:", error);
    process.exit(1);
  }
};

// Read todos from the file
const readTodos = async (): Promise<Todo[]> => {
  return await fs.readJson(DATA_FILE);
};

// Save todos to the file
const saveTodos = async (todos: Todo[]): Promise<void> => {
  await fs.writeJson(DATA_FILE, todos, { spaces: 1 });
};

// Create todo
app.post("/todo", async (req: Request, res: Response) => {
  const { title } = req.body;
  const todos = await readTodos();

  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);
  await saveTodos(todos);

  res.status(201).json(newTodo);
});

// Get all todos
app.get("/todos", async (req: Request, res: Response) => {
  const todos = await readTodos();
  res.status(200).json(todos);
});

// Get todo by id
app.get("/todo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todos = await readTodos();

  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  res.status(200).json(todo);
});

// Update todo by id
app.put("/todo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todos = await readTodos();
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  todo.title = title ?? todo.title;
  todo.completed = completed ?? todo.completed;

  await saveTodos(todos);
  res.json(todo);
});

// Delete todo
app.delete("/todo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  let todos = await readTodos();
  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== parseInt(id));

  if (todos.length < initialLength) {
    await saveTodos(todos);
    res.status(200).json({ message: `Id number ${id} todo's deleted` });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Start the server and initialize data file
app.listen(port, async () => {
  await initializeDataFile();
  console.log(`Server running on http://localhost:${port}`);
});
