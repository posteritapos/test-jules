import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
})
export class App implements OnInit {
  title = 'Todo App';
  todos: any[] = [];
  newTodo = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<any[]>(`${API_BASE_URL}/todos`).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (this.newTodo.trim().length === 0) {
      return;
    }
    this.http.post(`${API_BASE_URL}/todos`, { task: this.newTodo }).subscribe(() => {
      this.getTodos();
      this.newTodo = '';
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`${API_BASE_URL}/todos/${id}`).subscribe(() => {
      this.getTodos();
    });
  }
}
