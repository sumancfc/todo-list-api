import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  describe('Todo Test', () => {
    it('should return an array of todos', async () => {
      const todos = await todoController.findAllTodo();
      expect(Array.isArray(todos)).toBe(true);
    });

    it('should create a todo and return nothing', async () => {
      // Arrange: Create a new todo
      const newTodo = {
        id: 1,
        label: 'Create an awesome API',
        complete: false,
      };

      // Act: Call the createTodo method in the controller
      const result = await todoController.createTodo(newTodo);

      // Assert: Check if the result is undefined (or any other expected response)
      expect(result).toBeUndefined();

      // You can also check the state of the todoService.storage if necessary
      const storage = await todoService.findAllTodo();
      expect(storage).toContainEqual(newTodo);
    });
  });
});
