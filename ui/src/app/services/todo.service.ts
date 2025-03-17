import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = "http://localhost:3000/api/todos";
  // private baseUrl = "/api/todos";
  public todos: any;

  constructor(private http: HttpClient){}

  getTodos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  deleteTodo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  addTodo(todo: {title:string} ): Observable<any>{
    return this.http.post<any>(this.baseUrl,todo);
  }
  updateTodo(id:string,todo:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`,todo);
  }
}
