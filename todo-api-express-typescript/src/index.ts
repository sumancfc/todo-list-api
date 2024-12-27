import express, { Application, Request, Response } from "express";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app: Application = express();
const port: number = 8000;

app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
