import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo: any;
  @Input() index: any;
  @Output() deleteRequested = new EventEmitter<string>();
  @Output() editRequested = new EventEmitter<string>();

  constructor(private todoService: TodoService) {}
  
  onDelete(): void {
    this.deleteRequested.emit(this.todo._id);
  }
  onEdit(): void {
    this.editRequested.emit(this.todo._id);
  }
}
