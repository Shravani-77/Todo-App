import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/list', pathMatch: 'full' }, 
    {path: 'list', component: TodoListComponent},
    {path: 'edit', component: TodoFormComponent}
];
