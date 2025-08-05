import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { App } from './app';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        App
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Todo App'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Todo App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Todo App!');
  });

  it('should fetch and display todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const mockTodos = [
      { id: 1, task: 'Test Todo 1' },
      { id: 2, task: 'Test Todo 2' },
    ];

    fixture.detectChanges(); // ngOnInit is called here

    const req = httpTestingController.expectOne('/todos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodos);

    fixture.detectChanges(); // Update the view with the new data

    const todoElements = fixture.nativeElement.querySelectorAll('li');
    expect(todoElements.length).toBe(2);
    expect(todoElements[0].textContent).toContain('Test Todo 1');
    expect(todoElements[1].textContent).toContain('Test Todo 2');
  });

  it('should add a new todo', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.newTodo = 'New Todo';
    fixture.detectChanges();

    app.addTodo();

    const req = httpTestingController.expectOne('/todos');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ task: 'New Todo' });
    req.flush({}); // The backend returns the new todo, but we just need to complete the request

    // After adding, it should fetch the todos again
    const getReq = httpTestingController.expectOne('/todos');
    getReq.flush([]); // Return an empty list for simplicity

    expect(app.newTodo).toBe('');
  });

  it('should delete a todo', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const todoId = 1;

    app.deleteTodo(todoId);

    const req = httpTestingController.expectOne(`/todos/${todoId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});

    // After deleting, it should fetch the todos again
    const getReq = httpTestingController.expectOne('/todos');
    getReq.flush([]);
  });
});
