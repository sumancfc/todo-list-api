import {
  Body,
  Controller,
  Logger,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodo(): Todo[] {
    this.logger.log('Handling findAll() request...');
    return this.todoService.findAllTodo();
  }

  @Post()
  createTodo(@Body() todo: Todo): void {
    this.logger.log('Create() Request...');
    return this.todoService.createTodo(todo);
  }

  @Get(':id')
  findOneTodo(@Param('id', ParseIntPipe) id: number): Todo {
    this.logger.log('Find One Todo Request...');
    return this.todoService.findOneTodo(id);
  }
}
