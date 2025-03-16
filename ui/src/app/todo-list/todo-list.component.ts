import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoComponent } from '../todo/todo.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoComponent,FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true
})
export class TodoListComponent implements OnInit{
  public todos: any = [];
  public newTodo: string='';

  constructor(private todoService: TodoService) {}

  ngOnInit():void{
    this.loadTodos();
  }
  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      data => this.todos = data['todos']
    )
  }
  deleteTodo(id: string): void {
    console.log("delete")
    if (confirm('Are you sure you want to delete this todo?')) {
        this.todoService.deleteTodo(id).subscribe(() => {
            this.todos = this.todos.filter((todo: { _id: string; }) => todo._id !== id);
            alert('Todo deleted successfully!');
        });
    }
}
addTodo(): void {
  if (!this.newTodo.trim()) return;

  const newTodo = { title: this.newTodo, description: 'New Task Description' };
  this.todoService.addTodo(newTodo).subscribe(
    (createdTodo) => {
      this.todos=[...this.todos,createdTodo];
      this.newTodo = '';
      alert('Todo added successfully!');
    },
    error => console.error('Error adding todo:', error)
  );
}
editTodo(id: string): void {
  const updatedTitle = prompt('Edit Todo Title:');
  if (updatedTitle && updatedTitle.trim()) {
    this.todoService.updateTodo(id, { title: updatedTitle }).subscribe(
      () => {
        const todo = this.todos.find((todo: { _id: string; }) => todo._id === id);
        if (todo) todo.title = updatedTitle;
        alert('Todo updated successfully!');
      },
      error => alert('Failed to update todo. Please try again.')
    );
  }
}

}
