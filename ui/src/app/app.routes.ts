import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/todos', pathMatch: 'full' }, 
    {path: 'todos', component: TodoListComponent},
    {path: 'todo/:id', component: TodoFormComponent}
];
