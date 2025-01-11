import {
  Body,
  Controller,
  Logger,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodo(): Todo[] {
    this.logger.log('Handling findAllTodo() request...');
    return this.todoService.findAllTodo();
  }

  @Post()
  createTodo(@Body() todo: CreateTodoDto): void {
    this.logger.log('Create() Request...');
    return this.todoService.createTodo(todo);
  }

  @Get(':id')
  findOneTodo(@Param('id', ParseIntPipe) id: number): Todo {
    this.logger.log('Find One Todo Request...');
    return this.todoService.findOneTodo(id);
  }

  @Patch(':id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): void {
    this.logger.log('Handling updateTodo() request...');
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): void {
    this.logger.log('Handling deleteTodo() request...');
    return this.todoService.deleteTodo(id);
  }
}
