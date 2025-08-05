import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any[]>('/todos').subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (this.newTodo.trim().length === 0) {
      return;
    }
    this.http.post('/todos', { task: this.newTodo }).subscribe(() => {
      this.getTodos();
      this.newTodo = '';
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`/todos/${id}`).subscribe(() => {
      this.getTodos();
    });
  }
}
