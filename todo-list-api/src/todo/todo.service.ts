import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private storage: Todo[] = [];

  findAllTodo(): Todo[] {
    return this.storage;
  }

  createTodo(todo: Todo): void {
    const currentMaxId = Math.max(...this.storage.map((t: Todo) => t.id), 0);
    todo.id = currentMaxId + 1;
    this.storage.push(todo);
  }
}
