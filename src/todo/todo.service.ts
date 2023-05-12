import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, descripcion: 'Soy el primer TODO', done: false},
    { id: 2, descripcion: 'Soy el segundo TODO', done: false},
    { id: 3, descripcion: 'Soy el tercer TODO', done: false},

  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map( todo => todo.id ), 0) + 1;
    todo.descripcion = createTodoDto.descripcion;

    this.todos.push(todo);

    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const oneTodo = this.todos.find(todo => todo.id === id);
    if(!oneTodo) throw new NotFoundException(`TODO with id #${id} not found`);
    return oneTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const { done, descripcion } = updateTodoDto;

    const todo = this.findOne(id);

    if(done !== undefined) todo.done = done;

    if( descripcion ) todo.descripcion = descripcion;

    this.todos = this.todos.map( t => {
      if(t.id === id){
        return todo;
      }

      return t;
    } )

    return todo;
  }

  remove(id: number) {

    this.findOne(id);

    this.todos = this.todos.filter( todo => todo.id !== id);

    return `This action removes a #${id} todo`;
  }
}
