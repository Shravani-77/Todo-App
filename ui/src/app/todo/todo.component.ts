import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo: any;
  @Input() index: any;
  @Output() deleteRequested = new EventEmitter<string>();
  
  constructor(private router:Router) {}
  
  onDelete(): void {
    this.deleteRequested.emit(this.todo._id);
  }
  onEdit(): void {
    this.router.navigate(['/todo',this.todo._id]);
  }
}
